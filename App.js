import React, {useState, useEffect, useRef} from 'react';
import './App.scss';
import { v1 as uuid } from 'uuid';
function App() {


  const [starting,SetStarting] = useState(7)

  const [delay, setDelay] = useState(false)

  const [lives, setLives] = useState(5)
  const cardElement = {
    id:1,
    pair:1,
    position:1,
    flip:false,
    hide:false,
    img: null,
  }

  
  const finalArray = [];
  let imgNum = 1
  let pair = 1
  let pairId = uuid()
  for(let i = 0; i < (starting * 2); i++){

    finalArray.push({
      id: uuid(),
      position:i + 1,
      flip:false,
      hide:false,
      pairId:pairId,
      pointerEvents: true,
      img: `/images/pair-${ imgNum }.jpg`
    })
    pair ++;
    if(pair > 2){
      pair = 1
      imgNum++;
      pairId = uuid()
    }

  }

  
  //NOTE Randomize Array
  let shuffledArray = finalArray
  .map((value) => ({ value, sort: Math.random() }))
  .sort((a, b) => a.sort - b.sort)
  .map(({ value }) => value)


  const [cardArray, setCardArray]= useState(shuffledArray)
  

  const [itemsFlipped, setItemsFlipped] = useState(0)
  const flippedIds = useRef([])

  useEffect(()=>{
    if(itemsFlipped == 2){
      if(flippedIds.current[0].pairId != flippedIds.current[1].pairId){
  
        let newArray = cardArray.map(item =>{
          item.flip = false;
          return  item
        })
        setTimeout(() => {
          setCardArray(newArray)
          setItemsFlipped(0)
        }, 3000);
        flippedIds.current = []

        {
          /* 
console.log("before loop")
        console.log(cardArray)
        
        let newArray= cardArray.map(item =>{
          if(item.id == flippedIds.current[0].id){
            item.flip = false;
            return item
          }
          else if(item.id == flippedIds.current[1].id){
            item.flip = false;
            return item
          }
          else{
            return item
          }
        })
        console.log("before loop")
        console.log(cardArray)
        //console.log(newArray)
        setTimeout(() => {
          setCardArray(newArray)
        }, 3000);
        console.log("useEffect Flipped")
        setLives( prevState => prevState - 1 )
          */
        }
      }
      else{
        let newArray= cardArray.map(item =>{
          if(item.id == flippedIds.current[0].id){
            item.hide = true;
            item.pointerEvents = false
            return item
          }
          else if(item.id == flippedIds.current[1].id){
            item.hide = true;
            item.pointerEvents = false
            return item
          }
          else{
            return item
          }
        })
        setTimeout(() => {
          setCardArray(newArray)
        }, 3000);
      }
    }
    console.log("item: " + itemsFlipped)
  }, [itemsFlipped])

 //NOTE Handle Click
  const handleClick = (e) =>{
  
    let newArray= cardArray.map(item =>{
      if(item.id == e){
        item.flip = true;
        item.pointerEvents = false
        flippedIds.current.push(item)
        return item
      }
      else{
        return item
      }
    })
    setCardArray(newArray)

    console.log(flippedIds.current)
    setItemsFlipped(prevState => prevState + 1)
    setDelay(true)
    setTimeout(() => {
      setDelay(false)
    }, 1000);

  }


  const [allFlipped, setAllFlipped] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setAllFlipped(false)
    }, 1000);
  }, [])

  return (
    <div className="main" >
      {
        cardArray.map( item => {
          return <div onClick={ () => handleClick(item.id) } key={item.id} style={{pointerEvents:`${delay ? `none` : `all`}`}} className={` card ${item.hide ? `card-hide` : null} ${!item.pointerEvents ? `card-noPointerEvents` : null} `}>
            <div className="cardWrapper" >
              <div className={`frontside ${allFlipped || item.flip ? `frontside-rotate` : null} `} >
                ?
              </div>
              <div className={`backside ${allFlipped || item.flip ? `backside-rotate` : null} `}>
                <img src={item.img} alt="myphoto" />
              </div>
            </div>
          </div>
        })
      }
      
    </div>
  );
}

export default App;
