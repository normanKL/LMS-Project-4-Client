// - ./src/components/CourseDetail.tsx.tsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ICourse, IComment } from '../interfaces/course';
import { baseUrl } from '../config';
import './CourseDetail.css'

function CourseDetail() {
    const { id } = useParams<{ id: string }>();
    const [course, setCourse] = useState<ICourse | null>(null);
    const [comments, setComments] = useState<IComment[]>([]);
    const [newComment, setNewComment] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${baseUrl}/courses/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setCourse(response.data);
                setComments(response.data.comments); // Assuming comments are included in the response
            } catch (error) {
                console.error("Error fetching course details:", error);
            }
        };

        fetchCourse();
    }, [id]);

    const handleBack = () => {
        navigate(-1);
    };

    const isAuthorObject = (author: string | { name: string }): author is { name: string } => {
        return (author as { name: string }).name !== undefined;
    };

    const handleCommentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        try {
            const response = await axios.post(`${baseUrl}/comments/`, {
                text: newComment,
                course: course?.id
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setComments([...comments, response.data]);
            setNewComment('');
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    const handleDeleteComment = async (commentId: string) => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`${baseUrl}/comments/${commentId}/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // Filter out the deleted comment from the comments array
            setComments(comments.filter(comment => comment.id !== commentId));
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    };

    return (
        <div className="container">
            <button className="button button is-link" onClick={handleBack} style={{ marginTop: '50px' }}>Back to Previous</button>
            {course && (
                <div className="card" style={{ margin: 'auto', width: '50%', marginBottom: '50px', marginTop: '50px', backgroundColor: '#f5f5f5' }}>
                    <div className="card-image">
                        <figure className="image">
                            <img src={course.image_url} alt={course.title} style={{ objectFit: 'cover', width: '100%', height: '600px' }} />
                        </figure>
                    </div>
                    <div className="card-content">
                        <div className="box" style={{ marginTop: '10px' }}>
                            <h2 className="title" style={{ fontSize: '30px', fontWeight: 'bold', marginBottom: '30px' }}>{course.title}</h2>
                            <p style={{ marginTop: '15px' }}><strong>Description</strong></p>
                            <p>{course.description}</p>
                            <p style={{ marginTop: '25px' }}><strong>Created by:</strong> {isAuthorObject(course.author) ? course.author.name : course.author}</p>
                            <p><strong>Curator:</strong> {course.owner.username}</p>
                            <p className="subtitle" style={{ fontSize: '23px', marginTop: '40px' }}>
                                <a
                                    href={course.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ color: 'orange', textDecoration: 'underline' }}
                                >
                                    Click to start learning now!
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Comment Section */}
            <div className="comments-section" style={{ marginTop: '50px', marginBottom: '150px', marginRight:'150px', marginLeft:'150px' }}>
                <h3 className="title is-4">Comments</h3>
                <form onSubmit={handleCommentSubmit}>
                    <div className="field">
                        <label className="label">Add a Comment</label>
                        <div className="control">
                            <textarea
                                className="textarea"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Write your comment here..."
                                required
                            ></textarea>
                        </div>
                    </div>
                    <div className="control">
                        <button type="submit" className="button is-link">Submit Comment</button>
                    </div>
                </form>

                <div className="comments-list" style={{ marginTop: '20px' }}>
                    {comments.map(comment => (
                        <div key={comment.id} className="comment" style={{ marginBottom: '15px' }}>
                            <p><strong>{comment.owner.username}:</strong> {comment.text}</p>
                            <p className="is-size-7" style={{ color: 'gray' }}>{new Date(comment.created_at).toLocaleString()}</p>
                            {/* Delete button */}
                            <button
                                onClick={() => handleDeleteComment(comment.id)}
                                className="button is-small is-danger"
                                style={{marginTop:'5px', fontSize:'13px'}}
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CourseDetail;



