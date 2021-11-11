import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Link, Route, Routes, } from "react-router-dom";
import '../css/style.css';

const Home = () => <>
  <h1>Home Page</h1>
  <article><br />
    <h2>Article 1</h2>
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.Harum rem dolores praesentium mollitia sapiente ducimus dolorem libero sequi cum dolorum, consequuntur nobis nulla enim illo dicta officia aliquam itaque odit ipsa velit dolor.Quos nostrum ea aliquid similique ex quaerat corrupti, doloribus nemo quod delectus quae laudantium illum nisi porro cumque eum assumenda, deserunt, perferendis ratione.Distinctio dolorum amet, officia vero necessitatibus maiores tempora nam debitis ut ab tempore optio tenetur molestias.Labore, id harum quod ab necessitatibus alias deserunt soluta iure vel eos, dolore optio qui maiores repudiandae.Quam voluptatum perferendis beatae inventore aliquid laborum modi eligendi totam ut.</p>
  </article>
  <article><br />
    <h2>Article 1</h2>
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.Harum rem dolores praesentium mollitia sapiente ducimus dolorem libero sequi cum dolorum, consequuntur nobis nulla enim illo dicta officia aliquam itaque odit ipsa velit dolor.Quos nostrum ea aliquid similique ex quaerat corrupti, doloribus nemo quod delectus quae laudantium illum nisi porro cumque eum assumenda, deserunt, perferendis ratione.Distinctio dolorum amet, officia vero necessitatibus maiores tempora nam debitis ut ab tempore optio tenetur molestias.Labore, id harum quod ab necessitatibus alias deserunt soluta iure vel eos, dolore optio qui maiores repudiandae.Quam voluptatum perferendis beatae inventore aliquid laborum modi eligendi totam ut.</p>
  </article>
</>;

const About = () => <>
  <h1>About Page</h1>
  <article><br />
    <h2>Article 1</h2>
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.Harum rem dolores praesentium mollitia sapiente ducimus dolorem libero sequi cum dolorum, consequuntur nobis nulla enim illo dicta officia aliquam itaque odit ipsa velit dolor.Quos nostrum ea aliquid similique ex quaerat corrupti, doloribus nemo quod delectus quae laudantium illum nisi porro cumque eum assumenda, deserunt, perferendis ratione.Distinctio dolorum amet, officia vero necessitatibus maiores tempora nam debitis ut ab tempore optio tenetur molestias.Labore, id harum quod ab necessitatibus alias deserunt soluta iure vel eos, dolore optio qui maiores repudiandae.Quam voluptatum perferendis beatae inventore aliquid laborum modi eligendi totam ut.</p>
  </article>
  <article><br />
    <h2>Article 1</h2>
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.Harum rem dolores praesentium mollitia sapiente ducimus dolorem libero sequi cum dolorum, consequuntur nobis nulla enim illo dicta officia aliquam itaque odit ipsa velit dolor.Quos nostrum ea aliquid similique ex quaerat corrupti, doloribus nemo quod delectus quae laudantium illum nisi porro cumque eum assumenda, deserunt, perferendis ratione.Distinctio dolorum amet, officia vero necessitatibus maiores tempora nam debitis ut ab tempore optio tenetur molestias.Labore, id harum quod ab necessitatibus alias deserunt soluta iure vel eos, dolore optio qui maiores repudiandae.Quam voluptatum perferendis beatae inventore aliquid laborum modi eligendi totam ut.</p>
  </article>
  <article><br />
    <h2>Article 1</h2>
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.Harum rem dolores praesentium mollitia sapiente ducimus dolorem libero sequi cum dolorum, consequuntur nobis nulla enim illo dicta officia aliquam itaque odit ipsa velit dolor.Quos nostrum ea aliquid similique ex quaerat corrupti, doloribus nemo quod delectus quae laudantium illum nisi porro cumque eum assumenda, deserunt, perferendis ratione.Distinctio dolorum amet, officia vero necessitatibus maiores tempora nam debitis ut ab tempore optio tenetur molestias.Labore, id harum quod ab necessitatibus alias deserunt soluta iure vel eos, dolore optio qui maiores repudiandae.Quam voluptatum perferendis beatae inventore aliquid laborum modi eligendi totam ut.</p>
  </article>
  <article><br />
    <h2>Article 1</h2>
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.Harum rem dolores praesentium mollitia sapiente ducimus dolorem libero sequi cum dolorum, consequuntur nobis nulla enim illo dicta officia aliquam itaque odit ipsa velit dolor.Quos nostrum ea aliquid similique ex quaerat corrupti, doloribus nemo quod delectus quae laudantium illum nisi porro cumque eum assumenda, deserunt, perferendis ratione.Distinctio dolorum amet, officia vero necessitatibus maiores tempora nam debitis ut ab tempore optio tenetur molestias.Labore, id harum quod ab necessitatibus alias deserunt soluta iure vel eos, dolore optio qui maiores repudiandae.Quam voluptatum perferendis beatae inventore aliquid laborum modi eligendi totam ut.</p>
  </article>
  <article><br />
    <h2>Article 1</h2>
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.Harum rem dolores praesentium mollitia sapiente ducimus dolorem libero sequi cum dolorum, consequuntur nobis nulla enim illo dicta officia aliquam itaque odit ipsa velit dolor.Quos nostrum ea aliquid similique ex quaerat corrupti, doloribus nemo quod delectus quae laudantium illum nisi porro cumque eum assumenda, deserunt, perferendis ratione.Distinctio dolorum amet, officia vero necessitatibus maiores tempora nam debitis ut ab tempore optio tenetur molestias.Labore, id harum quod ab necessitatibus alias deserunt soluta iure vel eos, dolore optio qui maiores repudiandae.Quam voluptatum perferendis beatae inventore aliquid laborum modi eligendi totam ut.</p>
  </article>
  <article><br />
    <h2>Article 1</h2>
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.Harum rem dolores praesentium mollitia sapiente ducimus dolorem libero sequi cum dolorum, consequuntur nobis nulla enim illo dicta officia aliquam itaque odit ipsa velit dolor.Quos nostrum ea aliquid similique ex quaerat corrupti, doloribus nemo quod delectus quae laudantium illum nisi porro cumque eum assumenda, deserunt, perferendis ratione.Distinctio dolorum amet, officia vero necessitatibus maiores tempora nam debitis ut ab tempore optio tenetur molestias.Labore, id harum quod ab necessitatibus alias deserunt soluta iure vel eos, dolore optio qui maiores repudiandae.Quam voluptatum perferendis beatae inventore aliquid laborum modi eligendi totam ut.</p>
  </article>
  <article><br />
    <h2>Article 1</h2>
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.Harum rem dolores praesentium mollitia sapiente ducimus dolorem libero sequi cum dolorum, consequuntur nobis nulla enim illo dicta officia aliquam itaque odit ipsa velit dolor.Quos nostrum ea aliquid similique ex quaerat corrupti, doloribus nemo quod delectus quae laudantium illum nisi porro cumque eum assumenda, deserunt, perferendis ratione.Distinctio dolorum amet, officia vero necessitatibus maiores tempora nam debitis ut ab tempore optio tenetur molestias.Labore, id harum quod ab necessitatibus alias deserunt soluta iure vel eos, dolore optio qui maiores repudiandae.Quam voluptatum perferendis beatae inventore aliquid laborum modi eligendi totam ut.</p>
  </article>
  <article><br />
    <h2>Article 1</h2>
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.Harum rem dolores praesentium mollitia sapiente ducimus dolorem libero sequi cum dolorum, consequuntur nobis nulla enim illo dicta officia aliquam itaque odit ipsa velit dolor.Quos nostrum ea aliquid similique ex quaerat corrupti, doloribus nemo quod delectus quae laudantium illum nisi porro cumque eum assumenda, deserunt, perferendis ratione.Distinctio dolorum amet, officia vero necessitatibus maiores tempora nam debitis ut ab tempore optio tenetur molestias.Labore, id harum quod ab necessitatibus alias deserunt soluta iure vel eos, dolore optio qui maiores repudiandae.Quam voluptatum perferendis beatae inventore aliquid laborum modi eligendi totam ut.</p>
  </article>
  <article><br />
    <h2>Article 1</h2>
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.Harum rem dolores praesentium mollitia sapiente ducimus dolorem libero sequi cum dolorum, consequuntur nobis nulla enim illo dicta officia aliquam itaque odit ipsa velit dolor.Quos nostrum ea aliquid similique ex quaerat corrupti, doloribus nemo quod delectus quae laudantium illum nisi porro cumque eum assumenda, deserunt, perferendis ratione.Distinctio dolorum amet, officia vero necessitatibus maiores tempora nam debitis ut ab tempore optio tenetur molestias.Labore, id harum quod ab necessitatibus alias deserunt soluta iure vel eos, dolore optio qui maiores repudiandae.Quam voluptatum perferendis beatae inventore aliquid laborum modi eligendi totam ut.</p>
  </article>
</>;

const Services = () => <>
  <h1>Services Page</h1>
  <article><br />
    <h2>Article 1</h2>
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.Harum rem dolores praesentium mollitia sapiente ducimus dolorem libero sequi cum dolorum, consequuntur nobis nulla enim illo dicta officia aliquam itaque odit ipsa velit dolor.Quos nostrum ea aliquid similique ex quaerat corrupti, doloribus nemo quod delectus quae laudantium illum nisi porro cumque eum assumenda, deserunt, perferendis ratione.Distinctio dolorum amet, officia vero necessitatibus maiores tempora nam debitis ut ab tempore optio tenetur molestias.Labore, id harum quod ab necessitatibus alias deserunt soluta iure vel eos, dolore optio qui maiores repudiandae.Quam voluptatum perferendis beatae inventore aliquid laborum modi eligendi totam ut.</p>
  </article>
  <article><br />
    <h2>Article 1</h2>
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.Harum rem dolores praesentium mollitia sapiente ducimus dolorem libero sequi cum dolorum, consequuntur nobis nulla enim illo dicta officia aliquam itaque odit ipsa velit dolor.Quos nostrum ea aliquid similique ex quaerat corrupti, doloribus nemo quod delectus quae laudantium illum nisi porro cumque eum assumenda, deserunt, perferendis ratione.Distinctio dolorum amet, officia vero necessitatibus maiores tempora nam debitis ut ab tempore optio tenetur molestias.Labore, id harum quod ab necessitatibus alias deserunt soluta iure vel eos, dolore optio qui maiores repudiandae.Quam voluptatum perferendis beatae inventore aliquid laborum modi eligendi totam ut.</p>
  </article>
  <article><br />
    <h2>Article 1</h2>
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.Harum rem dolores praesentium mollitia sapiente ducimus dolorem libero sequi cum dolorum, consequuntur nobis nulla enim illo dicta officia aliquam itaque odit ipsa velit dolor.Quos nostrum ea aliquid similique ex quaerat corrupti, doloribus nemo quod delectus quae laudantium illum nisi porro cumque eum assumenda, deserunt, perferendis ratione.Distinctio dolorum amet, officia vero necessitatibus maiores tempora nam debitis ut ab tempore optio tenetur molestias.Labore, id harum quod ab necessitatibus alias deserunt soluta iure vel eos, dolore optio qui maiores repudiandae.Quam voluptatum perferendis beatae inventore aliquid laborum modi eligendi totam ut.</p>
  </article>
</>;

function MainComponent() {
  return (
    <BrowserRouter>
      <nav>
        {/* <nav> */}
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/services">Services</Link>
        {/* </nav> */}
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
        </Routes>
      </main>

      <footer className='footer'>
        <div>Footer 1</div>
        <div>Footer 2</div>
        <div>Footer 3</div>
      </footer>
    </BrowserRouter>
  );
}

ReactDOM.render(<MainComponent />, document.getElementById('root-div'));