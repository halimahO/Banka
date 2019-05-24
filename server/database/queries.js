export default {
  GET_ALL_ACCOUNT: values => ({
    text: "SELECT * FROM account WHERE (createdon >= $1::date or $1 is null) AND (createdon <= $2::date  + '1 day'::interval or $2 is null) AND (status = $3 or $3 is null)",
    values,
  }),
};
