import * as Knex from "knex";

const TABLE_NAME = 'users';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, table => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('avatar').notNullable();
    table.string('whatsapp').notNullable();
    table.string('bio').notNullable();
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}

