import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import "./index.scss";
import Alert from "../../components/global/alert";
import Toast from "../../components/global/toast";
import "../../argonLandingPage/SCSS/main.scss";
import Analytics from "../../argonLandingPage/components/Analytics";
import Blog from "../../argonLandingPage/components/Blog";
import PaidPlan from "../../argonLandingPage/components/PaidPlan";
import Footer from "../../components/footer";
import Label from "../../components/global/label";
import Tags from "../../components/global/tags";



import ProgressBar from "../../components/global/progressBar";
import { Button } from "../../components/global/button/index";
import { SocialIcons } from "../../components/global/social_icons";
import { Social_Button } from "../../components/global/socialButton";
import { SocialButton_link } from "../../components/global/socialButton_links";

import Tabs from "../../components/global/tabs";
import Slider from "../../components/global/slider";



import {awesomeProduct,Sub_Catagories, comments, reviews, slides, appList, footerBottomContent, customizableselectNames, dropdownsingle, li1, li2, li2h, li3, li3h, li4h, li4, pages, imagebackC1, imagebackC2, imagebackC3, imagebookcover1, radioOptions, exploreLinks, relatedBooksSliderDetails, ExploreMoreSliderDetails,whatClientSays ,joinOurWorldDetails, awesomeProject, invoices, relatedStories, topContent, cart, accordion, ourTeam, terms, ArticleCategoriesDetails, ArticlelatestPost, articelpopular} from "../../components/constants/mock";
import CustomizableSelect from '../../components/global/customizableSelect/CustomizableSelect';
import Toogle from "../../components/global/toogle";
//import GrowSpinners from "../../components/global/growSpinners";
import Checkbox from "../../components/global/checkbox";
import Comment from "../../components/comment";
import { Headings } from "../../components/global/headings";
import { DisplayTitle } from "../../components/global/Titles";
import { Quotes, Paragraphs } from "../../components/global/paragraphs";
import { Avatar, Images } from "../../components/global/images";
import { SpecializedTitle } from "../../components/global/SpecializedTitle";
import Sizes from "../../components/global/sizes";
import Modals from "../../components/global/modals";
import Chat from "../../components/chat";
import Popovers from "../../components/global/popovers";
import FullBackgroundCard from "../../components/global/fullbackgroundcards";

import Tooltips from "../../components/tooltips";
import BookStackCard from "../../pages/Book/components/bookStackCard";

import Radio from "../../components/global/radio";


import { Navbar } from "../../components/global/navbar";
import FeatureBlogCard from "../../components/global/featureBlogCard";
import BlogCard from "../../components/global/blogCard";
import LongCard from "../../components/global/longCard";
import ImageUpload from "../../components/global/imageUpload";
import AvatarUpload from "../../components/global/avatarUpload";
import ProfileCardWithDetail from "../../components/global/profileCardWithDetail";
import ProfileCard from "../../components/global/profileCard";
import Book from "../../pages/Book";
import ExploreLinkTab from "../../pages/Book/components/exploreLinkTab";

import RelatedBooksSlider from "../../pages/BookDetail/components/relatedBooksSlider";
// import { Reviews } from "../../pages/BookDetails/component/reviews";

import BookDetail from "../../pages/BookDetail";
import { SubCatagories } from "../../pages/Slide/component/SubCatagories";
import { Reviews } from "../../pages/BookDetail/components/reviews";
import Home from "../../pages/Home";
import ExploreMoreSlider from "../../pages/BookDetail/components/exploreMoreSubcategoriesSlider";
import { Error404 } from "../../components/ErrorPage/Error404";
import { Error500 } from "../../components/ErrorPage/Error500";

import SignUp from "../../components/signUp";

import BookCard from "../Book/components/bookCard";
import WhatClientSays from "../../components/whatClientSays";

import JoinOurWorld from "../../components/joinOurWorld";
import Feedback from "../../components/feedback";

import { ResetPassword } from "../../components/Reset";
import { AwesomeProducts } from "../../components/AwesomeProducts";
import { AwesomeProject } from "../../components/AwesomeProject";
import { Invoice } from "../../components/Invoice";
import { RelatedStories } from "../../components/BlogPosts/RelatedStories";
import { StackedSlideCard } from "../Slide/component/slideCard";
import { SlideCardWithDetail } from "../Slide/component/slideCardWithDetail";

import InputLabel from "../../components/global/inputLabel";

import { SocialCard } from "../../components/BlogPosts/socialIconCard";
import { BlogPosts } from "../../components/BlogPosts";
import { TopContent } from "../../components/BlogPosts/Content";
import NewsLinkTag from "../../components/global/newsLinkTag";
import AuthorDateRead from "../News/components/author-date-readTime";
import { Accordion } from "../../components/Accordion";
import { PostPopUp } from "../../components/postPopUp";
import { TermsAndServices } from "../TermsAndServices";
import { OurTeam } from "../OurTeam";

import NewsRating from "../../components/newsRating";
import NewsPlayBtn from "../../components/global/newsPlayBtn";
import { SocialFollower } from "../../components/global/SocialFollower";
import { SocialFollow } from "../Article/Component/SocialFollow";
import ArticleCategories from "../Article/Component/catagories";
import { LatestPost } from "../Article/Component/latestPost";
import { PopularPost } from "../Article/Component/popularPost";
import { Journal } from "../journal";
import { Rss } from "../../components/rssfetch/rss";
import { RssFeed } from "../../components/RssFeed";
import { ProfilePage } from "../Profile";
import Dropdown from "../../components/global/dropdown/Dropdown";
import DropdownSingle from "../../components/global/dropdown/DropdownSingle";
import { LoginModal } from "../../components/global/loginModel";
import { RegisterModel } from "../../components/global/registerModal";
import Paginate from "../../components/prabin/Paginate";
import CircularProgressBar from "../../components/circularProgressBar";
import ShareModelAfterUpload from "../uploadPageMain/components/shareModelAfterUploading";









const Component = () => {

  const selectedTags = tags => {
 
  }

  return (
    <>
      <div className="component-page-container">
        {/* <BookCard
          image={require('../../images/bookcover.png').default}
          title='Anatomy Recall(Recall series)'
          author='Manoj Khatri(author)'
          rating='4'
        />
        <Reviews profilePic={require("../../assets/images/members.jpg")} username="Cm pandey" reviews={reviews} />
        <SubCatagories subCategories={Sub_Catagories} /> */}
        <SlideCardWithDetail
          slideImage1={require("../../assets/images/members.jpg")}
          slideImage2={require("../../assets/images/members.jpg")}
          slideImage3={require("../../assets/images/members.jpg")}
          slides={slides}
        />
        <StackedSlideCard
          slideImage1={require("../../assets/images/members.jpg")}
          slideImage2={require("../../assets/images/members.jpg")}
          slideImage3={require("../../assets/images/members.jpg")}
          slides={slides}
        />

        {/* <HeadNav/>
     <Carousal/>
     <Intro/> */}

        <Alert
          message="This is a success alert---check it out!"
          type="Info"
          backgroundColor="primary"
        />

        <Label
          type="pill"
          size="small"
          backgroundColor="primary"
        />
        <Label
          type="links"
          size="large"
          backgroundColor="primary"
        />
        <Checkbox
          checked={false}
          disabled={false}
          option="Unchecked"
        />
        <Checkbox
          checked={true}
          disabled={false}
          option="Checked"
        />
        <Checkbox
          checked={false}
          disabled={true}
          option="Disabled Unchecked"
        />
        <Checkbox
          checked={true}
          disabled={true}
          option="Disabled Checked"
        />
        <Chat />
        {/* <FeatureBlogCard />
        <BlogCard />
        <LongCard />

         <ProfileCardWithDetail
          profileImage={require("../../assets/images/profilebg.png")}
          userName="Austin Johnson"
          level="Project Manager"
          description="Don't be scared of the truth because we need to restart the human foundation in truth And I love you..."
        />
        <ImageUpload />
        <AvatarUpload /> 
        <Radio
          checked="Checked" //You have to pass an option instead of checked
          options={radioOptions}
        />
        <Radio
          disabled="true"
          checked="Checked" //You have to pass an option instead of checked
          options={radioOptions}
        />
        <Comment
          comments={comments}
        />
        {/* <Toast
          user="Creative Tim"
          userImage={require("../../assets/images/Profile Pic.png")}
          message="Hello,world!This is a default toast message. "
          time="12"
        // backgroundColor="primary"
        />
        <Slider
          min="10"
          max="50"
          value="30"
          thumbColor="danger"
          progressColor="primary"
        />

        <Analytics /> */}
        {/* <Tabs
        tabs={tabs}
        buttonColor="dark"
        direction="horizontal"
      /> */}

        <Blog />
        <PaidPlan />


        <DropdownSingle datas={dropdownsingle}/>


        <Dropdown list1={li1}
               list2head={li2h}
               list2={li2} 
               list3head={li3h}
               list3={li3} 
               list4head={li4h}
               list4={li4} 
           />
    

        <Button type="secondary-rounded" label="Primary" />
        <SocialIcons type="twitter" icon="twitter" />
        <SocialIcons type="youtube" styles="rounded" icon="youtube" />
        <SocialIcons type="instagram" styles="rounded" icon="instagram" />
        <Social_Button type="facebook" icon="facebook" label="Facebook" />
        <Social_Button type="instagram" icon="instagram" label="Instagram" />
        <SocialButton_link icon="facebook" type="facebook" />
        <SocialButton_link icon="linkedin" type="linkedin" />



        {/* <Toogle activeColor='Primary' state='false' />
        <Toogle activeColor='Default' state='true' />
        <Toogle activeColor='Danger' state='true' />
        <Toogle activeColor='Warning' state='false' />
        <Toogle activeColor='Success' state='false' />
        <Toogle activeColor='Info' state='false' />




        <Tags selectedTags={selectedTags} tags={['anatomy', 'liver']} />



        <CustomizableSelect names={customizableselectNames} />

        <Toogle activeColor='Primary' state='false' />
        <Toogle activeColor='Default' state='true' /> */}
        <Toogle activeColor='Danger' state='true' />
        <Toogle activeColor='Warning' state='false' />
        <Toogle activeColor='Success' state='false' />
        <Toogle activeColor='Info' state='false' />

        {/* 
      <GrowSpinners type='Circle'/>
      <GrowSpinners type='Box-Circle'/>
      <GrowSpinners type='Box-Circle-Text' text='loading...'/>  */}

        <Headings type="heading1" content="Hello, I am Heading-1" />
        <Headings type="heading5" content="Hello, I am Heading-5" />

        <DisplayTitle type="display1" title="Hello I'm Display Title-1" />
        <DisplayTitle type="display4" title="Hello I'm Display Title-4" />
        
        {/* <Paginate /> */}





        <Quotes quote="hello I will be the leader of a company that ends up being
      worth billions of dollars, because I got the answers." author="cm pandey" />

        <Paragraphs content="I will be the leader of a company that ends up being
      worth billions of dollars, because I got the answers."/>

        <Paragraphs type="info-text" content="I will be the leader of a company that ends up being
      worth billions of dollars, because I got the answers."/>

        <Modals activeColor='Primary' type='default' />
        <Modals activeColor='Warning' type='Notification' />
        <Modals activeColor='Default' type='FormModal' />
        <Modals activeColor='Danger' type='LongModal' />
        <Modals activeColor='Success' type='MessageModal' />
        <Modals activeColor='Info' type='SignupModal' />

        <Images type="circle-raised" Image={require("../../assets/images/members.jpg")}
          width={100} height={100} />






        <SpecializedTitle type="heading-title" style="warning-text"
          label="hello I will be the leader of a company" />





        <SpecializedTitle type="heading" style="display3"
          label="hello I will be the leader of a company"
          content="I will be the leader of a company that ends up being
      worth billions of dollars, because I got the answers"></SpecializedTitle>

        <Avatar Image={require("../../assets/images/members.jpg")} size={100} text="this is avatar" />


        <Sizes type='ExtraLarge' txt='extra large modal' />
        <Sizes type='Large' txt=' large modal' />
        <Sizes type='Small' txt='small modal' />

        <Popovers activeColor='Primary' txt='primary' position='right' />
        <Popovers activeColor='Warning' txt='warning' position='bottom' />
        <Popovers activeColor='Default' txt='default' position='right' />
        <Popovers activeColor='Danger' txt='danger' position='left' />
        <Popovers activeColor='Success' txt='success' position='top' />
        <Popovers activeColor='Info' txt='info' position='bottom' />

        <Tooltips activeColor='Primary' txt='tooltip on bottom' position='bottom' />
        <Tooltips activeColor='Warning' txt='tooltip on bottom' position='bottom' />
        <Tooltips activeColor='Default' txt='tooltip on right' position='right' />
        <Tooltips activeColor='Danger' txt='tooltip on left' position='left' />
        <Tooltips activeColor='Info' txt='tooltip on bottom' position='bottom' />
        <Tooltips activeColor='Success' txt='tooltip on top' position='top' />






{/* 

        <BookStackCard bookImage={imagebookcover1} title='Principles of genetics' authorInfo='Manoj' rating='4.0' views='5k views' /> */}







{/* 
        <RelatedBooksSlider slidesPerView={6} bookDetails={relatedBooksSliderDetails} />

        <ExploreMoreSlider ExploreSliderDetails={ExploreMoreSliderDetails} />

        <ExploreLinkTab links={exploreLinks} />
        <Error404 />
        <Error500 /> */}

{/* 
        <SignUp /> */}

        {/* <WhatClientSays details={whatClientSays} /> */}
        {/* <ResetPassword />
        <AwesomeProducts awesomeProduct={awesomeProduct} />

        <JoinOurWorld details={joinOurWorldDetails} />

        <Feedback />
        <AwesomeProject awesomeProject={awesomeProject} />
        <Invoice invoices={invoices} cartSection={cart} />
        <RelatedStories relatedStories={relatedStories} /> */}
        {/* <BlogPosts /> */}
        <TopContent topContent={topContent} />

        {/* <div className='newsLinkTag-link'>
          <div className="newsLinkTag-link-circle"></div>
          <div className="newsLinkTag-link-text">business</div>
        </div> */}
        {/* 
       <Feedback />
      <AwesomeProject awesomeProject={awesomeProject}/> 
      <Invoice invoices={invoices} cartSection={cart}/>
      <RelatedStories relatedStories={relatedStories}/>
      {/* <BlogPosts/> */}
        <TopContent topContent={topContent} />
        {/* 
      <InputLabel text='Name'/>
      <InputLabel text='Email'/>
      <InputLabel text='Password'/> */}

        <NewsLinkTag color='#994db1' tag='business' link={'/#123'} />
        <NewsLinkTag color='#2568ef' tag='travel' link={'/#456'} />
        <Accordion accordion={accordion} />

{/*      
      <PostPopUp/>
      <TermsAndServices terms={terms}/>
      <OurTeam ourTeam={ourTeam}/>

 
      <NewsRating bgColor='red' rating='8.5' />
      <NewsPlayBtn />

      <AuthorDateRead author='Ram' authorColor='red' link='/ram' date='September 19,2019' readTime='4 Min read' color='black' fontSize='14px'/>
      <AuthorDateRead  date='September 19,2019' readTime='4 Min read' color='red' fontSize='12px'/>
      <AuthorDateRead  date='September 19,2019' color='blue' fontSize='12px'/> */}
      
      </div>
      {/* <SocialFollow/>
      <ArticleCategories details={ArticleCategoriesDetails}/>
      <LatestPost latestPost={ArticlelatestPost}/>
      <PopularPost popular={articelpopular}/>
      <Journal/> */}
      {/* <Rss/> */}
      {/* <RssFeed/> */}
      {/* <ProfilePage/> */}
      {/* <LoginModal/> */}
      {/* <RegisterModel/> */}
      {/* <CircularProgressBar squareSize={200} strokeWidth={10} /> */}
      {/* <ShareModelAfterUpload /> */}
    
    </>
  );
}

export default Component;
