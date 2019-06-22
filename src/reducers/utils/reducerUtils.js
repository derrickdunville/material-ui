function deleteDoc(docs, payload){
  let target_index = -1
  for(let i = 0; i < docs.length; ++i){
    if(docs[i]._id == payload._id){
      target_index = i
      break
    }
  }
  if(target_index > -1){
    return ([...docs.slice(0, target_index), ...docs.slice(target_index + 1)])
  } else {
    return ([...docs])
  }
}

function updateDoc(docs, payload){
   return docs.map(doc => (doc._id === payload._id) ? payload : doc)
}

export { deleteDoc, updateDoc }
