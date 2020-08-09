import { Request, Response } from 'express';

import db from "../database/connection";
import parseSchedule, { convertTimeStringToMinutes } from "../utils/parseSchedule";

interface IClassesFilter {
  week_day: number;
  subject: string;
  time: string;
}

export default class ClassesController {
  async index(req: Request<any,any,any,IClassesFilter>, res: Response) {
    const filters = req.query;
    const { week_day, subject, time } = filters;

    if(!week_day || !subject || !time) {
      return res.status(400).json({
        error: 'Missing filters to search classes'
      })
    }

    const timeInMinutes = convertTimeStringToMinutes(time);

    const classes = await db('classes')
      .whereExists(function() {
        this.select('class_schedule.*')
          .from('class_schedule')
          .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
          .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
          .whereRaw('`class_schedule`.`from` <= ??', [Number(timeInMinutes)])
          .whereRaw('`class_schedule`.`to` > ??', [Number(timeInMinutes)])
      })
      .where('classes.subject', '=', subject)
      .join('users', 'classes.user_id', '=', 'users.id')
      .select(['classes.*', 'users.*']);

    return res.json(classes);
  }

  async create(req: Request, res: Response) {
    const {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost,
      schedule
    } = req.body;
  
    const trx = await db.transaction();
  
    try {
      const insertedUsersIds = await trx('users').insert({
        name, avatar, whatsapp, bio
      });
    
      const [ user_id ] = insertedUsersIds;
      const insertedClassesIds = await trx('classes').insert({
        subject, cost, user_id
      });
    
      const [ class_id ] = insertedClassesIds;
      await trx('class_schedule').insert(parseSchedule(schedule, class_id));
    
      await trx.commit();
    
      return res.status(201).send();
    } catch (error) {
      trx.rollback();
  
      return res.status(400).json({
        error: 'Unexpected error while creating new class'
      })
    }
  }
}