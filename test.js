require('./handler').post(
  {
    body: JSON.stringify(
      {
        comment: `My comment`,
        title: `My title`
      }
    )
  },
  {},
  () => {
    console.log(`Done`)
  }
);