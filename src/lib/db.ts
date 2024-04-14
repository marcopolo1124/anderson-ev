import { Pool } from "pg";
import bcrypt from "bcryptjs";

const env = process.env;

const pool = new Pool({
    host: env.DB_HOST,
    user: env.DB_USER,
    database: env.DB,
    password: env.DB_PASSWORD,
    port: parseInt(env.DB_PORT ? env.DB_PORT : "5432"),
    ssl: false,
});

export async function postUser(
    email: string,
    password: string,
    first_name: string,
    last_name: string
) {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    try {
        await pool.query(
            "INSERT INTO public.users (email, password, first_name, last_name)\
             VALUES ($1, $2, $3, $4)",
            [email, hashedPassword, first_name, last_name]
        );
    } catch (e) {
        return {
            code: 400,
            msg: "invalid input",
        };
    }
    return {
        code: 200,
        msg: "registration successful",
    };
}

export async function verifyUser(inputEmail: string, inputPassword: string) {
    try {
        const req = await pool.query(
            "SELECT id, email, first_name, last_name, password FROM public.users WHERE email = $1;",
            [inputEmail]
        );
        if (req.rowCount == null || req.rowCount <= 0) {
            console.log("email not correct");
            return {
                code: 404,
                msg: "email not found",
            };
        }

        const { id, email, first_name, last_name, password } = req.rows[0];
        if (bcrypt.compareSync(inputPassword, password)) {
            console.log("success");
            return {
                code: 200,
                msg: "Login successful",
                id,
                email,
                first_name,
                last_name,
            };
        } else {
            console.log("password incorrect");
            return {
                code: 403,
                msg: "invalid password",
            };
        }
    } catch (e) {
        console.log({ e });
        return {
            code: 500,
            msg: "Something went wrong",
        };
    }
}

export async function getUserInfo(inputEmail: string) {
    try {
        const req = await pool.query(
            "SELECT email, first_name, last_name FROM public.users WHERE email = $1",
            [inputEmail]
        );
        if (req.rowCount == null || req.rowCount <= 0) {
            return {
                code: 404,
            };
        }
        const { email, first_name, last_name } = req.rows[0];
        return {
            code: 200,
            email,
            first_name,
            last_name,
        };
    } catch (e) {
        return {
            code: 500,
        };
    }
}

export async function getUserTimeBasedSchedules(
    page: number = 1,
    perPage: number = 10,
    email: string
) {
    if (page <= 0) {
        page = 1;
    }
    if (perPage <= 0) {
        perPage = 1;
    }

    const res = await pool.query(
        `SELECT s.id, s.start_time, s.end_time
            FROM public.time_based_schedules as s
            INNER JOIN public.users as u ON s.user_id = u.id
            WHERE u.email = $1
            OFFSET ($2 - 1) * $3
            LIMIT $3
        `,
        [email, page, perPage]
    );
    return res.rows;
}

export async function getUserMileageBasedSchedules(
    page: number = 1,
    perPage: number = 10,
    email: string
) {
    if (page <= 0) {
        page = 1;
    }
    if (perPage <= 0) {
        perPage = 1;
    }

    const res = await pool.query(
        `SELECT s.id, s.ready_by_time, s.desired_mileage
            FROM public.mileage_based_schedules as s
            INNER JOIN public.users as u ON s.user_id = u.id
            WHERE u.email = $1
            OFFSET ($2 - 1) * $3
            LIMIT $3
        `,
        [email, page, perPage]
    );
    return res.rows;
}

export async function getUserChargeBasedSchedules(
    page: number = 1,
    perPage: number = 10,
    email: string
) {
    if (page <= 0) {
        page = 1;
    }
    if (perPage <= 0) {
        perPage = 1;
    }

    const res = await pool.query(
        `SELECT s.id, s.ready_by_time, s.desired_charge_level
            FROM public.charge_based_schedules as s
            INNER JOIN public.users as u ON s.user_id = u.id
            WHERE u.email = $1
            OFFSET ($2 - 1) * $3
            LIMIT $3
        `,
        [email, page, perPage]
    );
    return res.rows;
}

export default pool;
