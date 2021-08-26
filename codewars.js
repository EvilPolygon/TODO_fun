function longest(s1, s2) {
  
    let res = ''
    
    for (let i = 97; i<= 122; i++){
      let subj = String.fromCharCode(i)
      
      if(s1.indexOf(subj) == -1){
        if(s2.indexOf(subj) == -1){
          continue
        }
      }
      res += subj
    }
    return res
  }

  console.log(longest("aretheyhere", "yestheyarehere"))