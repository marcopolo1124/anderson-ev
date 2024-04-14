CREATE TABLE IF NOT EXISTS public.charge_based_schedules
(
    user_id bigint NOT NULL DEFAULT nextval('charge_based_schedules_user_id_seq'::regclass),
    desired_charge_level integer NOT NULL,
    id bigint NOT NULL DEFAULT nextval('charge_based_schedules_id_seq'::regclass),
    ready_by_time time without time zone NOT NULL,
    CONSTRAINT charge_based_schedules_pkey PRIMARY KEY (id),
    CONSTRAINT fk_users_cb_s FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT charge_between_range CHECK (desired_charge_level <= 100 AND desired_charge_level >= 0)
);

CREATE TABLE IF NOT EXISTS public.charge_schedules_active_days
(
    schedule_id integer NOT NULL,
    date date NOT NULL,
    CONSTRAINT charge_schedules_active_days_pkey PRIMARY KEY (schedule_id, date),
    CONSTRAINT fk_charge_active FOREIGN KEY (schedule_id)
        REFERENCES public.charge_based_schedules (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
        NOT VALID
);

CREATE TABLE IF NOT EXISTS public.mileage_based_schedules
(
    id bigint NOT NULL DEFAULT nextval('mileage_based_schedules_id_seq'::regclass),
    ready_by_time time without time zone NOT NULL,
    desired_mileage integer NOT NULL,
    user_id integer NOT NULL,
    CONSTRAINT mileage_based_schedules_pkey PRIMARY KEY (id),
    CONSTRAINT fk_users_mb_s FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT mileage_between CHECK (0 <= desired_mileage AND desired_mileage <= 250)
);

CREATE TABLE IF NOT EXISTS public.mileage_schedule_active_days
(
    schedule_id integer NOT NULL,
    date date NOT NULL,
    CONSTRAINT mileage_schedule_active_days_pkey PRIMARY KEY (schedule_id, date),
    CONSTRAINT fk_mileage_active_days FOREIGN KEY (schedule_id)
        REFERENCES public.mileage_based_schedules (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
        NOT VALID
);

CREATE TABLE IF NOT EXISTS public.time_based_schedule_active_days
(
    schedule_id integer NOT NULL,
    date date NOT NULL,
    CONSTRAINT time_based_schedule_active_days_pkey PRIMARY KEY (schedule_id, date),
    CONSTRAINT fk_time_based_active FOREIGN KEY (schedule_id)
        REFERENCES public.time_based_schedules (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
        NOT VALID
);

CREATE TABLE IF NOT EXISTS public.time_based_schedules
(
    id bigint NOT NULL DEFAULT nextval('time_based_schedules_id_seq'::regclass),
    start_time time without time zone NOT NULL,
    end_time time without time zone NOT NULL,
    user_id bigint,
    CONSTRAINT time_based_schedules_pkey PRIMARY KEY (id),
    CONSTRAINT fk_users_tb_s FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT start_smaller_than_end CHECK (start_time < end_time)
);

CREATE TABLE IF NOT EXISTS public.users
(
    id integer NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    first_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    last_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    password character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (id)
)