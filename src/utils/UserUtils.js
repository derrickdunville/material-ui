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

/* Takes the list of all available memberships and list of the users transactions
  Determines the memberships the users is allowed to purchase.
  Checks for already used trial and active memberships so they are not
  displayed as an option to purchase.
  RETURNS: The list of memberships the user is allowed to purchase.
*/
export function getAvailableMemberships(products, transactions){
  // get all active membership product ids
  let activeMembershipProductIds = new Set()
  let highestMembershipLevel = -1
  for(let i = 0; i < transactions.length; ++i){
    let current = transactions[i]
    if(current.product.category == "membership"){
      // check for existing trial transaction (membership_level 0)
      if(current.product.membership_level == 0){
        activeMembershipProductIds.add(current.product._id)
        highestMembershipLevel = 0
      }
      // check the expires_at
      if(current.expires_at){
        let expires = new Date(current.expires_at)
        let now = new Date()
        if(expires > now){
          // membership has not expired yet
          activeMembershipProductIds.add(current.product._id)
          if(current.product.membership_level > highestMembershipLevel){
            highestMembershipLevel = current.product.membership_level
          }
        }
      } else {
        // no expiration date
        activeMembershipProductIds.add(current.product._id)
        if(current.product.membership_level > highestMembershipLevel){
          highestMembershipLevel = current.product.membership_level
        }
      }
    }
  }

  // if a product id exists in active memberships exluce it
  if(activeMembershipProductIds.size > 0){
    let filteredProducts = []
    for(let i = 0; i < products.length; ++i){
      // if the current product is not one of the users active products and its membership level is greater then users current active membership
      if(!activeMembershipProductIds.has(products[i]._id) && products[i].membership_level > highestMembershipLevel){
        filteredProducts.push(products[i])
      }
    }
    console.dir(filteredProducts)
    return filteredProducts
  } else {
    return products
  }
}
