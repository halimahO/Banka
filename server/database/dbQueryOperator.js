import pool from './index';
import QUERY from './queries';

class databaseController {
  static async executeQuery(query) {
    await pool.query(query);
  }

  static async getAllAccount(values) {
    const res = await pool.query(QUERY.GET_ALL_ACCOUNT(values));
    return res.rows;
  }
}

export default databaseController;
