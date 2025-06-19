
const taskPool = require('../dbconfig').pool;
const createTaskService = async function (body: { title: string, description: string, dueDate: string }, userId: number) {
  try {
    const result = await taskPool.query(
      'INSERT INTO tasks (title, description, due_date, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [body.title, body.description, body.dueDate, userId]
    );
    return result;
  } catch (err: any) {
    throw new Error(err.message);
  }
}
module.exports.createTaskService = createTaskService;
const getTasksService = async function (queryString: { status?: string, dueDate?: string, limit?: number, offset?: number }, userId: number) {
  try {
    let query = 'SELECT * FROM tasks WHERE user_id = $1';
    const conditions: string[] = [];
    const params: any[] = [userId];
    let paramIndex = 2;

    if (queryString.status) {
      conditions.push(`status = $${paramIndex++}`);
      params.push(queryString.status);
    }
    if (queryString.dueDate) {
      conditions.push(`due_date = $${paramIndex++}`);
      params.push(queryString.dueDate);
    }
    if (conditions.length > 0) {
      query += conditions.join(' AND ');
    }
    if (queryString.limit) {
      query += ` LIMIT $${paramIndex++}`;
      params.push(queryString.limit);
    }
    if (queryString.offset) {
      query += ` OFFSET $${paramIndex++}`;
      params.push(queryString.offset);
    }

    console.log('Final query:', query, 'Params:', params);

    const result = await taskPool.query(query, params);
    return result;

  } catch (err:any) {
    throw new Error(err.message);
  }

}
module.exports.getTasksService = getTasksService;
const getTaskByIdService = async function (id: number, userId: number) {
  try {
    const result = await taskPool.query('SELECT * FROM tasks WHERE id = $1 AND user_id = $2', [id, userId]);
    return result;
  } catch (err: any) {
    throw new Error(err.message);
  }
}
module.exports.getTaskByIdService = getTaskByIdService;
const updateTaskService = async function (id: number, body: { title?: string, description?: string, dueDate?: string, status?: string }, userId: number) {
  try {
    const response = await getTaskByIdService(id, userId);
    if (!response.rows[0]) return ({ fails: 'Task not found' });

    const result = await taskPool.query(`UPDATE tasks SET title=$1, description=$2, status=$3, due_date=$4 
       WHERE id=$5 AND user_id=$6 RETURNING *`, [body?.title, body?.description, body?.status, body?.dueDate, id, userId]);
    return result;
  } catch (err: any) {
    throw new Error(err.message);
  }
}
module.exports.updateTaskService = updateTaskService;
const completeTaskService = async function (id: number, body: { status?: string }, userId: number) {
  try {
    const response = await getTaskByIdService(id, userId);
    if (!response.rows[0]) return ({ fails: 'Task not found' });

    const result = await taskPool.query('UPDATE tasks SET status = $1 WHERE id = $2 AND user_id = $3 RETURNING *', [body.status, id, userId]);
    return result;
  } catch (err: any) {
    throw new Error(err.message);
  }
}
module.exports.completeTaskService = completeTaskService;
const deleteTaskService = async function (id: number, userId: number) {
  try {
    const response = await getTaskByIdService(id, userId);
    if (!response.rows[0]) return ({ fails: 'Task not found' });

    const result = await taskPool.query('DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *', [id, userId]);
    return result;
  } catch (err: any) {
    throw new Error(err.message);
  }
}
module.exports.deleteTaskService = deleteTaskService;