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

create table product
(
	id serial not null
		constraint product_pkey
		primary key,
	category integer default 1,
	name varchar(250) not null,
	description varchar(4000) not null,
	cost numeric(8,2) not null,
	status integer default 1 not null,
	file_grp integer
);

create table orders
(
	id serial not null
		constraint orders_pkey
		primary key,
	customer_id integer not null
		constraint order_customer_id_fk
		references customer,
	date timestamp default now(),
	delivery_type integer not null,
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

INSERT INTO users (email, first_name, last_name, password, role, salt, token, expired) VALUES ('admin@admin', 'admin', 'admin', '59e5a72ed92b3646f81c87643863dd116a14fc5e7b8bed2953b98f05c30aab690629bdee36f3e3a5831e4be6f46aa72ff9d18d86b3e2c4e7537a5a42935467aa', 1, '9e0fccd4a8953dd6', '3e87660980537a32699e36d8a6248a90ebbc34dea8a5619904a63bce84c6586ce06be910d26e4145d7921f96369866403f2ab51d505564c3dd4110c7fbfb658b', '2017-10-03 20:29:15.725215');
