export function getActiveMemberships(transactions){
  let activeMemberships = []
  for(let i = 0; i < transactions.length; ++i){
    let transaction = transactions[i]
    if(transaction.product.category == 'membership'){
      // a null expiration date means they have lifetime access
      if(transaction.expires_at == null){
        activeMemberships.push(transaction)
      } else {
        //otherwise the product is not lifetime and we need to check the expiration date
        let expires = new Date(transaction.expires_at)
        let now = new Date()
        if(expires > now){
          activeMemberships.push(transaction)
        }
      }
    }
  }
  return activeMemberships
}
