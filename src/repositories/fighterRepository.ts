import connection from "../database.js";

export async function getAll() {
    const result = await connection.query(`
        SELECT *
        FROM fighters
        ORDER BY
            wins DESC,
            draws DESC;
    `);

    return result.rows[0];
}

export async function getByUsername(username: string) {
    const result = await connection.query(`
        SELECT *
        FROM fighters
        WHERE
            username = $1
    `, [username]
    );

    return result.rows[0];
}

export async function create(username: string) {
    const result = await connection.query(`
        INSERT INTO
            fighters (username, wins, losses, draws)
        VALUES ($1, 0, 0, 0)
        RETURNING id;
    `, [username]
    );

    return result.rows[0];
}

export async function update(id: number, wins: number, losses: number, draws: number) {
    const result = await connection.query(`
        UPDATE fighters
        SET
            wins += $2,
            losses += $3,
            draws += $4
        WHERE
            id = $1
    `, [id, wins, losses, draws]
    );

    return result.rows[0];
}