import * as Knex from "knex";

const TABLE_NAME = 'classes';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, table => {
    table.increments('id').primary();
    table.string('subject').notNullable();
    table.decimal('cost').notNullable();

    table.integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')  // If user's id is updated, it will update all user_id data
      .onDelete('CASCADE'); // If user is deleted, it will delete all the user's classes
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}

