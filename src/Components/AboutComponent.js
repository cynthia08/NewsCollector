import React from 'react'
import home01 from '../assets/images/home001.png';
import home02 from '../assets/images/home002.png';
import home03 from '../assets/images/home003.png';
import home05 from '../assets/images/home004.png';
import plugin002 from '../assets/images/plugin002.png';
import plugin003 from '../assets/images/plugin003.gif'
import divider from '../assets/images/divider.png';
import './css/AboutComponent.css'
import { Link } from '@material-ui/core';


/*
********************************************************************************************
  AboutComponent contains the content on how to use the application.
********************************************************************************************
*/

function AboutComponent() {
  return (
    <div>
        <div className='learn-more'>
                <div className='intro-learnmore'>
                    <h2>Our Research</h2>
                    <img src={divider} alt="Top1" height={4} width={200}></img>

                    <h4>Many people use Social Media to share content online. 
                    A lot of human interaction and information exchange is
                    taking place on Social Media. This may have drastic effects on society 
                    (political polarization, misinformation,information distortion, etc.)
                    Furthermore, the recommendation algorithms running in the background of
                    these social media sites add an additional layer of 
                    complexity by filtering the information based on the 
                    user's history, likes, and comments, which in turn influence 
                    the opinion of the people interacting with it. 
                    To understand this complex process of opinion formation we want
                    to understand the way users receive content from such recommendation 
                    systems and their reactions on them.
                    </h4>
                </div>

                <div className='plugin-info'>
                    <div className='plugin-text'>
                        <h2>Browser Extension</h2>
                        <img src={divider} alt="Top1" height={4} width={100}></img>
                        <h4>
                            The <Link href="https://github.com/Pr0gramWizard/news-hub/releases/download/v1.2.0/build_v1.2.0.zip">NewsHub</Link> browser extension collects Tweets with News URLs 
                            when scrolling through Twitter's timeline. When a tweet is detected, it will be highlighted yellow and stored for later review. 
                            For more details on the browser extension, check out<Link href="https://github.com/Pr0gramWizard/news-hub/tree/master/apps/browser_extension"> the Github page</Link>. For installation
                            instructions refer to the <Link href="https://youtu.be/S0rv_k7yJho"  target="_blank">video tutorial.</Link> <br/>
                           
                        </h4>
                    </div>
                    <div className='plugin-imas'>
                        <img src={plugin002} alt="Top2" className='plugin-imas2'></img>
                        <img src={plugin003} alt="Top2" className='plugin-imas3'></img>
                    </div>
                    <div className='plugin-highlight'>
                        <p><span className='bold'>*Please note: Only the Tweet public information (text, URL, Tweet author) will be collected when using 
                        the extension. No personal information from the Twitter is collected.</span></p>
                    </div>
                </div>

                <div className='divider-style'></div>

                <div className='intro-learnmore'>
                    <h2>News Collector Website</h2>
                    <img src={divider} alt="Top1" height={4} width={200}></img>
                    <h4>
                        By using the News Collector website you can review the information collected 
                        from the browser extension. The News Collector tool shows the amount of content 
                        you are receiving from the different News Sources seen on Twitter. These results are
                        compared with your reactions (Likes and Retweets) on the different tweet authors.
                    </h4>

                </div>

                <div className='profile-info'>
                    <div>
                        <img src={home01} alt="Profile" className='profile-ima'></img>
                    </div>
                    <div className='profile-text'>
                        <h2>Your Profile</h2>
                        <img src={divider} alt="Top1" height={4} width={100}></img>
                        <h4>Review the main News Sources appearing
                            in your Twitter feed and compare it with the main posts you have reacted to
                            (the sources you have Liked or Retweeted the most). 
                        </h4>
                    </div>
                </div>
                <div className='divider-style'></div>
                <div className='top1-info'>
                    <div className='top1-text'>
                        <h2>Top News Sources</h2>
                        <img src={divider} alt="Top1" height={4} width={100}></img>
                        <h4>Learn how much presence each of the News Sources has on your Twitter profile (News information you are
                            receiving on your feed). 
                        </h4>
                    </div>
                    <div >
                        <img src={home02} alt="Top1" className='top1-ima'></img>
                    </div>
                </div>
                <div className='divider-style'></div>

                <div className='top2-info'>
                    <div >
                        <img src={home03} alt="Top2" className='top2-ima'></img>
                    </div>
                    <div className='top2-text'>
                        <h2>Tweets by News Source</h2>
                        <img src={divider} alt="Top1" height={4} width={100}></img>
                        <h4>Get details on each of the tweets found and compare how diverse and visible is the content of
                            the each of the News Sources.
                        </h4>
                    </div>
                    
                </div>
                <div className='divider-style'></div>
                <div className='global-info'>
                    <div className='global-text'>
                        <h2>Global Details</h2>
                        <img src={divider} alt="Top1" height={4} width={100}></img>
                        <h4>Compare your statistics with other users using the same plugin and see how the numbers differ
                            for each of the News Sources.
                        </h4>
                    </div>
                    <div >
                        <img src={home05} alt="Globals" className='global-ima'></img>
                    </div>
                </div>

            </div>
    </div>
  )
}

export default AboutComponent