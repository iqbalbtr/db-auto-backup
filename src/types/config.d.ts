type DatabaseType = "mysql"

type MySqlBackupType = {
    type: "mysql"
    username?: string,
    password?: string,
    database: string,
    path?: string
}

type PostgresBackupConfig = {
  type: "postgres";
  username?: string;
  password?: string;
  database: string;
  path?: string;
};

type ConfigBackup = MySqlBackupType | PostgresBackupConfig

export {
    ConfigBackup,
    DatabaseType
}