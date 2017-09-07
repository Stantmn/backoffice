create sequence attach_group_id_seq;

create table users
(
	id serial not null
		constraint users_pkey
		primary key,
	email varchar(255) not null,
	first_name varchar(255) not null,
	last_name varchar(255) not null,
	password varchar(128),
	role smallint,
	salt varchar(16),
	token varchar(255),
	expired timestamp(6)
);

create unique index email
	on users (email);

create index token
	on users (token);

create table customer
(
	id serial not null
		constraint customer_pkey
		primary key,
	first_name varchar(255) not null,
	last_name varchar(255) not null,
	shipping_address varchar(400),
	billing_address varchar(400),
	phone varchar(20),
	email varchar(255) not null,
	creation_time timestamp(6) with time zone default now() not null,
	password varchar(128),
	salt varchar(16),
	token varchar(255),
	status smallint default 0 not null,
	file_grp integer,
	shipping_different boolean
);

create table attach
(
	id serial not null
		constraint attach_pkey
		primary key,
	group_id integer not null,
	filename varchar(255) not null,
	type smallint not null
);

