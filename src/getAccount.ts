import pgp from "pg-promise";
export async function getAccount(accountId: string) {
  const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
  const [account] = await connection.query("select * from ccca.account where accountId = $1", [accountId]);
  await connection.$pool.end();
  if (!account) throw new Error('Account not found.')
  return account
}
