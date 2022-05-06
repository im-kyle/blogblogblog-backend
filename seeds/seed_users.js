/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.seed = async function(knex) {
  await knex('users').del()
  await knex('users').insert([
    {first_name: 'Kyle', last_name: 'Horne', username: 'imkyle', password_hash: '$2a$12$RkLdUj2w2gyyZAqKa54wSuLBrieKPPa/jClEbQiaQr.tBLK.v.u/C'},
    {first_name: 'Caitlin', last_name: 'Breck', username: 'cjb', password_hash: '$2a$12$RkLdUj2w2gyyZAqKa54wSuLBrieKPPa/jClEbQiaQr.tBLK.v.u/C'},
  ]);
};