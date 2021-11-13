import { Link, Route, Routes } from "react-router-dom";
import { ServicesNested1 } from './ServicesNested1';
import { ServicesNested2 } from './ServicesNested2';

export const Services = () => <>
  <h1>Services Page</h1>
  <Link to="*/ServicesNested1">Services Nested One</Link><br />
  <Link to="*/ServicesNested2">Services Nested Two</Link>
  <Routes>
    <Route path="*/ServicesNested1" element={<ServicesNested1 />} />
    <Route path="*/ServicesNested2" element={<ServicesNested2 />} />
  </Routes>
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