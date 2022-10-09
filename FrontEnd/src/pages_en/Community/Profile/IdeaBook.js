// eslint-disable-next-line no-continue
import React, {useState, useEffect} from 'react';
import CloseIcon from '@mui/icons-material/Close';
import styled from "styled-components";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft, FaComments } from 'react-icons/fa';
import SendIcon from '@material-ui/icons/Send';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  field: {
      marginBottom: "10px",
    "&&": {
      //marginRight: "100px",
    }
  }
});
const useBtnStyles = makeStyles({
  field: {
      marginLeft: "278px",
    "&&": {
      //marginRight: "100px",
    }
  }
});
const IdeaBook = ({items}) =>{
    console.log("items");
    console.log(items);
    const allComments = [items.map((item)=>item.comments)];
    const[stateItems, setStateItems] = useState(items);
    const [current, setCurrent] = useState(0);
    const [startImage, setStartImage] = useState(0);
    const [model, setModel] = useState(false);
    const [isHovered, setHover] = useState(false);
    const [commentsList,setCommentsList] = useState(allComments);
    const length = items.length;
    const [currentCommentItem, setCurrentCommentItems] = useState(commentsList);
    const classes = useStyles();
    const btnClasses = useBtnStyles();
    const [message, setMessage] = useState('');
    const [updated, setUpdated] = useState(message);
  //   useEffect(() => {
  //      setCurrentCommentItems(commentsList);
  //  }, [commentsList]);
    //console.log(currentCommentItem);

    const handleChange = (event) => {
        setMessage(event.target.value);
      };
    
      const handleClick = () => {
        //console.log(current);
      //  let idLast = currentCommentItem[currentCommentItem.length-1].id;
         let commentsArray = 
             {id: 3, 
             comment: message
        };
      //items.push(commentsArray);
      //setStateItems(
      stateItems.map(function(obj, i){
        if(obj.id == current)
        {
            obj.comments.push(commentsArray);
        }
        })
      //)
        //window.location.reload();
      console.log(stateItems);
      };
    
   
          const nextSlide = () => {
          setCurrent(current === items[length-1].id ? startImage : current + 1);
          //console.log("id :" + iid + " current: " + current);
          const found = [items.find(obj => {
            if(obj.id === (current + 1)){
               return obj.comments;
            };
            
          })];
          //console.log(found);
          setCommentsList(found.map((item)=>item.comments));
          setCurrentCommentItems(found.map((item)=>item.comments));
        };
      
        const prevSlide = () => {
          setCurrent(current === 0 ? length - 1 : current - 1);
        };
        
      
        if (!Array.isArray(items) || items.length <= 0) {
          return null;
        }
    

    const getImg = (imgSrc, comments) =>{
        setStartImage(imgSrc);
        setCommentsList(allComments);
        setCurrent(imgSrc);
        setModel(true);
        //setCurrentCommentItems(comments);
        //console.log(currentCommentItem);
    }

     return(
        <>
            <Wrapper>
                <div className={model? "model open": "model"}>
                      <section className='slider'>
                      <CloseIcon className='close-btn' onClick={() => setModel(false)}/>
                      <FaArrowAltCircleLeft className='left-arrow' onClick={prevSlide} />
                      <FaArrowAltCircleRight className='right-arrow' onClick={nextSlide}/>
                  {   
                    stateItems.map((slideImgaes) => {
                      const {id,title,img,desc,likes, comments} = slideImgaes;
                      return (
                          <div
                              className={id === current ? 'slide active' : 'slide'}
                              key={id} 
                          >
                              {id === current && (
                              <img src={img} alt='travel image' className='image'key={id} />
                              )}
                              
                          </div>
                      );
                              })
                          }
                          </section>
                    </div>

                    <div className={model? "model-small open": "model-small"} >     
                    <List sx={{ width: '100%', maxWidth: 360, marginTop: "100px", bgcolor: 'background.paper' }} key="uniqueId3">
                    {stateItems.map((slideComments) => {
                      const {id, comments} = slideComments;
                      return(   
                              <>
                              {id === current && (
                                comments.map((commentsArray) =>{
                                  return(
                          <ListItem alignItems="flex-start" key={id}> 
                            <ListItemAvatar >
                              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                            </ListItemAvatar>
                            <ListItemText 
                              primary={'User Name'}
                              secondary={
                                <React.Fragment>
                                  <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                  >
                                 
                                   {commentsArray.comment}
                                  </Typography>
                                  
                                </React.Fragment>
                              }
                            />
                          </ListItem> 
                          );
                                    })
                                  
                      )}
                          </>
                  );
                    })
                    }
                    <div className='commentStyle'>
               <form >
                    <TextField
                        label="Add Comment"
                        size="small"
                        variant="outlined"
                        placeholder="Add Comment"
                        fullWidth
                        className={classes.field}
                        onChange={handleChange}
                        value={message}
                    />
                    <Button
                        variant="contained"
                        size="small"
                        className={btnClasses.field}
                        endIcon={<SendIcon />}
                        onClick={handleClick}
                    >
                        Send
                    </Button>
                </form>
                </div>
                    </List>
                    </div>
                  
             
                    
          <div className='section-center'>
                {
                    items.map((menuItem)=>{
                        const {id,title,img,desc,likes, comments} = menuItem;

                         return(
                            <Wrapper>
                             <div className="menu-item" key={id} onClick={() => getImg(id, comments)} onMouseOver={() => setHover(true)}
            onMouseLeave={() => setHover(false)}>
                                  <img src={img} alt={title} className="photo" />
                                  
                                  <div className="item-info">
                                   <header>
                                     <h4>{title}</h4>
                                    
                                     <CommentIcon className='price'
                                        size="lg" 
                                        style={{cursor: "pointer"}}                                                                            
                                        variant="primary"
                                    />
                                    </header>
                                      <p className="item-text">{desc}</p>
                                  </div>
                             </div>
                             </Wrapper>
                         )
                         
                    })
                }
          </div>
          </Wrapper>
          </>
     )
}

export default IdeaBook

const Wrapper = styled.div`
body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
  
    line-height: 1.5;
    font-size: 0.875rem;
  }
  
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  h2{
    font-size: 72px;
  }
  .menu{
    padding: 1rem 0;
  }
  .title {
    text-align: center;
    margin-bottom: 1rem;
  }
  .underline{
    width: 5rem;
    height: 0.25rem;
    background: black;
    margin-left: auto;
    margin-right: auto;
  }
  .btn-container{
    margin-bottom: 4rem;
    display: flex;
    justify-content: center;
  }
  
  .btn{
    background-color: black;
    color: white;
    font-size: 14px;
    border-radius: 15px;
    margin: 10px 10px;
    cursor: pointer;
    margin-top: 70px;
  }
  .filter-btn:hover{
    background: black;
    color: white;
  }
  .section-center{
    width: 90vw;
    margin: 0 auto;
    display: grid;
    gap: 3rem 2rem;
    justify-items: center;
  }
  .menu-item{
    display: grid;
    gap: 1rem 2rem;
    max-width: 30rem;
  }
  .photo{
    object-fit: cover;
    height: 200px;
    width: 100%;
    cursor: pointer;
    border: 0.25rem solid black;
    display: block;
  }
  .photo:hover{
    filter: opacity(0.8);
  }
  .item-info header{
    display: flex;
    justify-content: space-between;
  }
  .item-info h4{
    margin-bottom: 0.5rem;
  }
  .price{
    color: black;
    cursor: pointer;
  }
  .section-center{
    width: 45vw;
    display: flex;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
  }
  .photo{
    height: 150px;
  }
  
  .model{
    width: 65%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f6f6f6;
    transition: opacity .4s ease, visibiity .4s ease, transform .5s ease-in-out;
    visibility: hidden;
    opacity: 0;
    transform: scale(0);
    overflow: hidden;
    z-index: 999;
  }
  .model-small{
    width: 35%;
    height: 100vh;
    position: fixed;
    top: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    transition: opacity .4s ease, visibiity .4s ease, transform .5s ease-in-out;
    visibility: hidden;
    opacity: 0;
    transform: scale(0);
    overflow: hidden;
    z-index: 999;
  }
  .model.open{
    visibility: visible;
    opacity: 1;
    transform: scale(1);
  }
  .model-small.open{
    visibility: visible;
    opacity: 1;
    transform: scale(1);
  }
  .model img{
    width: auto;
    max-width: 70%;
    height: auto;
    max-height: 100%;
    display: block;
    line-height: 0;
    box-sizing: border-box;
    padding: 20px 0 20px;
    margin: 0 auto;
  }
  .model.open svg{
    position: fixed;
    top: 10px;
    right: 10px;
    width: 2rem;
    height: 2rem;
    padding: 5px;
    background-color: rgba(0,0,0,0.4);
    color: white;
    cursor: pointer;
  }
  .slider {
    position: relative;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .image {
    width: 1000px;
    height: 600px;
    border-radius: 10px;
  }
  
  .right-arrow {
    position: absolute;
    top: 50%;
    bottom: 20%;
    right: 32px;
    margin-top: 300px;
    font-size: 3rem;
    color: #000;
    z-index: 10;
    cursor: pointer;
    user-select: none;
  }
  .close-btn {
    position: absolute;
    top: 50%;
    bottom: 20%;
    right: 32px;
    margin-top: 70px;
    font-size: 3rem;
    color: #000;
    z-index: 10;
    cursor: pointer;
    user-select: none;
  }
  
  .left-arrow {
    position: absolute;
    top: 50%;
    left: 32px;
    margin-top: 300px;
    font-size: 3rem;
    color: #000;
    z-index: 10;
    cursor: pointer;
    user-select: none;
  }
  
  .slide {
    opacity: 0;
    transition-duration: 1s ease;
  }
  
  .slide.active {
    opacity: 1;
    transition-duration: 1s;
    transform: scale(1.08);
    
  }
  .heart{
    font-size: 35px;
    color:rgb(182, 173, 173);
    margin-top: 7px;
     width: 70px;
     outline: none;
     text-transform: uppercase;
     cursor: pointer;
     font-weight: bold;
     &:hover{
         color: rgb(192, 39, 39);
     }
    &.active {
     color: red;
    }
  }
  .vl {
    border-left: 6px solid gray;
    height: 100%;
    position: absolute;
    left: 100%;
    margin-left: -3px;
    top: 0;
  }
  .post {
    display: flex;
    width: 500px;
    background-color: white;
    margin-right: auto;
    margin-left: auto;
    border: 1px solid lightgray;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .post__image {
    max-width: 500px;
  }
  .post__text {
  margin: 20px 0px 20px 20px
  }
  .post__text {
    font-weight: normal;
    padding: 5px;
  }
  .commentform {
    display: flex;
    margin-top: 100px;
  }
  .commentStyle{
    bottom: 100;
  }
  .post__input {
    /* flex: 1; */
  }`
  ;