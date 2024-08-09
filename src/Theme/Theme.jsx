import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Support from '../Support/Support';
import user from './user.svg';
import cal from './cal.svg';
import './theme.scss';
import { jwtDecode } from "jwt-decode"; // Adjusted the import as jwtDecode is usually a default export
import config from '../config.js';
const Theme = () => {
   const token = localStorage.getItem("goodgame");
   const isLoggedIn = token && jwtDecode(token).name;
   const { id } = useParams(); // Get the post ID from the URL
   const [post, setPost] = useState(null);
   const [newComment, setNewComment] = useState('');
   useEffect(() => {
      fetch(`${config.API_URL}/forum/${id}`)
         .then(res => res.json())
         .then(data => {
            setPost(data);
         })
         .catch(error => {
            console.error(error);
         });
   }, [id]);
   const highlightMentions = (text) => {
      const parts = text.split(/(\s+)/).map((part) => {
         if (part.startsWith('@')) {
            return `<span style="color: black; font-weight: bold;">${part}</span>`;
         }
         return part;
      });
      return parts.join('');
   };

   if (!post) {
      return <p>Loading...</p>;
   }
   const handleAddComment = () => {
      fetch(`${config.API_URL}/forum/${id}/comments`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({ text: newComment, by: isLoggedIn }), // Replace with actual user info
      })
         .then(res => res.json())
         .then(data => {
            setPost(data); // Update post with the new comment
            setNewComment(''); // Clear the input field
         })
         .catch(error => {
            console.error(error);
         });
   };
   return (
      <>
         <Header />
         <div className="theme">
            <h1 id='theme_title'>{post.title}</h1>
            <p id='theme_text'>{post.desc}</p>
            <div className="kon">
               <p style={{ marginTop: "20px" }}>
                  <img src={user} alt="Objavio:" /><b>{post.by}</b>
               </p>
               <p style={{ marginTop: "20px" }}>
                  <img src={cal} alt="Objavljeno:" /><b>{new Date(post.createdAt).toLocaleDateString('sr')}</b>
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
                  <p dangerouslySetInnerHTML={{ __html: highlightMentions(comment.text) }} style={{ width: "95%", margin: "20px auto" }}></p>
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
