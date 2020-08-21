import React from 'react';

const AboutCohort = () => {
  return (
    <div className="aboutComponent">
      <div className="wrapper">

        <section className="aboutHeader">
          <h2>About COHORT</h2>
          <p>COHORT is a platform to inspire, reflect and collaborate with your team.</p>
        </section>

        <section className="aboutDescription">

          <article>
            <h3>Inspire</h3>
            <p>Become inspired and inspire others.  A random quote is given to inspire you.  Reflect on your inspiration for your Cohort to see.</p>
          </article>

          <article>
            <h3>Reflect</h3>
            <p>All reflections are anonymously shared for your Cohort to see.  Gain insight and inspiration from others' reflections.</p>
          </article>

          <article>
            <h3>Collaborate</h3>
            <p>Work with your Cohort by discussing your reflections and inspirations, or collaborate on your work.</p>
          </article>

        </section>

        <p className="aboutDisplayName">Click on the "Anonymous" name on the side bar to change your display name.  Refreshing the app will reset the name.</p>

      </div>

      <section className="aboutFooter">
        <p>Copyright <a href="https://alexcalia.com">Alex Calia</a> &copy; 2020</p>

        <p>API provided by <a href="https://github.com/lukePeavey/quotable#get-random-quote">Quotable API</a></p>
      </section>
    </div>
  );
}

export default AboutCohort;