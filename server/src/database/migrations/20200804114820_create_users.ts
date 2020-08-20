import * as Knex from "knex";

const TABLE_NAME = 'users';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, table => {
    table.increments('id').primary();

    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('email').notNullable().unique();
    table.string('password').notNullable();

    table.string('avatar').nullable();
    table.string('whatsapp').nullable();
    table.string('bio').nullable();
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}

