const userSort = (sort) => {

  return {
    $sort: sort
  }
}


module.exports = userSort;
