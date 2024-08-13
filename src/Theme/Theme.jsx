import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Support from '../Support/Support';
import userIcon from './user.svg';
import calIcon from './cal.svg';
import './theme.scss';
import { jwtDecode } from 'jwt-decode'; // Corrected import
import config from '../config.js';

const Theme = () => {
   const token = localStorage.getItem("goodgame");
   const isLoggedIn = token && jwtDecode(token).name;
   const { id } = useParams();
   const [post, setPost] = useState(null);
   const [newComment, setNewComment] = useState('');

   useEffect(() => {
      fetch(`${config.API_URL}/forum/${id}`)
         .then(res => res.json())
         .then(data => {
            setPost(data);
         })
         .catch(error => {
            console.error("sc");
         });
   }, [id]);

   const highlightMentions = (text) => {
      return text.split(/(\s+)/).map((part, index) => {
         if (part.startsWith('@')) {
            return (
               <span key={index} style={{ color: 'black', fontWeight: 'bold' }}>
                  {part}
               </span>
            );
         }
         return part;
      });
   };

   const handleAddComment = () => {
      // Prevent empty or whitespace-only comments
      if (!newComment.trim()) {
         return;
      }

      fetch(`${config.API_URL}/forum/${id}/comments`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({ text: newComment, by: isLoggedIn }),
      })
         .then(res => res.json())
         .then(data => {
            setPost(data);
            setNewComment('');
         })
         .catch(error => {
            console.error("sc");
         });
   };

   if (!post) {
      return <p>Loading...</p>;
   }

   return (
      <>
         <Header />
         <div className="theme">
            <h1 id='theme_title'>{post.title}</h1>
            <p id='theme_text'>{post.desc}</p>
            <div className="kon">
               <p style={{ marginTop: "20px" }}>
                  <img src={userIcon} alt="Objavio:" /><b>{post.by}</b>
               </p>
               <p style={{ marginTop: "20px" }}>
                  <img src={calIcon} alt="Objavljeno:" /><b>{new Date(post.createdAt).toLocaleDateString('sr')}</b>
               </p>
               <p style={{ marginTop: "20px" }}>
                  TEMA: <b>{post.theme}</b>
               </p>
            </div>
         </div>
         <div id="comments">
            <div className="p_c_w">
               <input
                  type="text"
                  placeholder="Dodaj komentar"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
               />
               <button onClick={handleAddComment}>+</button>
            </div>
            {post.comments.map((comment, index) => (
               <div key={index}>
                  <p style={{ width: "95%", margin: "20px auto" }}>
                     {highlightMentions(comment.text)}
                  </p>
                  <div className="bys">
                     <span>{comment.by}</span>
                     <span>{new Date(comment.date).toLocaleDateString('sr')}</span>
                  </div>
               </div>
            ))}
         </div>

         <Support />
         <Footer />
      </>
   );
};

export default Theme;
