class APIFeatures {
  query: any;
  queryStr: any;
  constructor(query: any, queryStr: any) {
    (this.query = query), (this.queryStr = queryStr);
  }
  search() {
    const vok = this.queryStr.vok
      ? {
          deutsch: {
            $regex: this.queryStr.vok,
          },
        }
      : {};
    // console.log(vok);

    this.query = this.query.find({ ...vok });
    return this;
  }
}

export default APIFeatures;
