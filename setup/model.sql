create database nvms_x;
\c nvms_x

create table admins(
    admin_id int generated by default as identity primary key,
    role smallint not null default 0,
    login varchar(40) not null,
    password varchar(64) not null
);
create unique index admin_index on admins(lower(login));

create table schools(
    school_id int generated by default as identity primary key,
    name varchar(100) not null,
    login varchar(40) not null,
    password varchar(64) not null
);
create unique index school_index on schools(lower(login));

create table classes(
    class_id int generated by default as identity primary key,
    class varchar(10) not null,
    school_id int not null,
    constraint fk_school
        FOREIGN key (school_id)
            references schools(school_id)
            on delete cascade
);
create unique index class_index on classes(lower(class), school_id);

create table parents(
    parent_id int generated by default as identity primary key,
    parent VARCHAR(100) not null,
    phone varchar(20) not null,
    password varchar(64) not null,
    telegram_id bigint,
    step smallint not null default 0,
    class_id int not null,
    constraint fk_class
        FOREIGN key (class_id)
            references classes(class_id)
            on delete cascade
);

--insert value
create extension pgcrypto;

insert into admins (role, login, password) values (1, 'admin', crypt('1234', gen_salt('bf')));

insert into schools (name, login, password) values ('118-maktab', '118', crypt('1111', gen_salt('bf')));
insert into schools (name, login, password) values ('120-maktab', '120', crypt('2222', gen_salt('bf')));


--functions
--find telegram id
create or replace function find_tg_id(user_id bigint, parent_phone text) returns int language plpgsql as
$$
declare
    user_count int;
    find_parent int;
begin
    select
        count(*)
        into find_parent
    from
        parents
    where
        phone = parent_phone;

    if find_parent >= 1 then
        select
            count(*)
            into user_count
        from
            parents
        where
            phone = parent_phone and
            telegram_id = user_id;

        if user_count = 0 then
            update parents
            set telegram_id = user_id,
                step = 1
            where phone = parent_phone;

            return 1;
        else
            return 0;
        end if;
    else
        return 2;
    end if;
end;
$$;
