function getMessages(messages) {
  return messages.filter(function(obj){
    return obj.message.length < 50
  }).map(function(index){
    return index.message;
  })
}