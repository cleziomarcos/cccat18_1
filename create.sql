drop schema if exists ccca cascade;

create schema ccca;

create table ccca.account (
	accountId uuid primary key,
	name text not null,
	email text not null,
	cpf text not null,
	carPlate text null,
	isPassenger boolean not null default false,
	isDriver boolean not null default false,
	password text not null
);
