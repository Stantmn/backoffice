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

create index attach_group_id_index
	on attach (group_id);

create table product
(
	id serial not null
		constraint product_pkey
		primary key,
	category integer default 1 not null,
	name varchar(250) not null,
	description varchar(4000) not null,
	cost numeric(8,2) not null,
	status integer default 1 not null,
	file_grp integer
);

create table "order"
(
	id serial not null
		constraint orders_pkey
		primary key,
	customer_id integer not null
		constraint order_customer_id_fk
		references customer,
	date timestamp default now(),
	total numeric(10,2) not null,
	delievery_type integer not null,
	status integer default 0
);


create table item
(
	order_id integer not null
		constraint item_order_id_fk
		references orders,
	product_id integer not null
		constraint item_product_id_fk
		references product,
	price numeric(8,2),
	count integer default 1
);

create unique index item_order_id_product_id_user_id_uindex
	on item (order_id, product_id;

