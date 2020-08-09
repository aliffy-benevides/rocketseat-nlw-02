import * as Knex from "knex";

const TABLE_NAME = 'class_schedule';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, table => {
    table.increments('id').primary();
    
    table.integer('week_day').notNullable();
    table.integer('from').notNullable();
    table.integer('to').notNullable();

    table.integer('class_id')
      .notNullable()
      .references('id')
      .inTable('classes')
      .onUpdate('CASCADE')  // If user's id is updated, it will update all user_id data
      .onDelete('CASCADE'); // If user is deleted, it will delete all the user's classes
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}

