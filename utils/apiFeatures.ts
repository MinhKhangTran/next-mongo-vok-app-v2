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
  paginate(resPerPage: number) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    this.query = this.query.limit(resPerPage).skip(skip);
    return this;
  }
}

export default APIFeatures;
