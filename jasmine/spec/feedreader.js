/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
  /* This is our first test suite - a test suite just contains
  * a related set of tests. This suite is all about the RSS
  * feeds definitions, the allFeeds variable in our application.
  */
  describe('RSS Feeds', function () {
    /* This is our first test - it tests to make sure that the
     * allFeeds variable has been defined and that it is not
     * empty. Experiment with this before you get started on
     * the rest of this project. What happens when you change
     * allFeeds in app.js to be an empty array and refresh the
     * page?
     */
    it('are defined', function () {
      expect(allFeeds).toBeDefined()
      expect(allFeeds.length).not.toBe(0)
    })

    it('should have URL defined and not be empty', function () {
      allFeeds.forEach(function (feed) {
        /**
         * Test that each feed has defined and non empty url
         */
        expect(feed.url).toBeDefined()
        expect(feed.url).not.toBe('')
      })
    })
  })

  /**
   * Describing test for basic menu functionality
   */
  describe('The menu', function () {
    /**
     * Making sure the menu is in initial state before each test
     */
    beforeEach(function () {
      $('body').toggleClass('menu-hidden', true)
    })

    /**
     * Making sure after all test run app returns to its original state
     */
    afterAll(function () {
      $('body').toggleClass('menu-hidden', true)
    })

    /**
     * Menu is hidden before any action
     */
    it('should be hidden by default', function () {
      expect($('body').attr('class')).toBe('menu-hidden')
    })

    /**
     * Testing if clicking on menu icon shows menu
     */
    it('should change visibility when menu icon is clicked', function () {
      let body = $('body')

      /**
       * Testing that before clicking the menu icon the menu is hidden
       */
      expect(body.attr('class')).toBe('menu-hidden')
      $('.menu-icon-link').click()

      /**
       * Testing that after clicking the menu is visible
       */
      expect(body.attr('class')).not.toBe('menu-hidden')
    })
  })

  /**
   * Describing test for initial entries after `loadFeed` function finishes
   */
  describe('Initial Entries', function () {
    /**
     * Making sure async function finished to test its outcome
     */
    beforeEach(function (done) {
      loadFeed(0, function () {
        done()
      })
    })

    /**
     * Function loads at least one entry upon finishing
     */
    it('should load at least one entry', function (done) {
      let feed = $('.feed')
      /**
       * Making sure after `loadFeed` finishes there is at least one entry in feed container
       */
      expect(feed.children().length).not.toBe(0)

      let feedList = feed.children()
      feedList.toArray().forEach(function (entryLink, i) {
        /**
         * Test that there are `.entry` elements in feed container
         */
        expect(entryLink.contains($('.entry').get(i))).toBe(true)
      })
      done()
    })
  })

  /**
   * Describing test of a new feed selection
   */
  describe('New Feed Selection', function () {
    /**
     * Emptying feed before test to prepare environment
     */
    beforeEach(function () {
      $('.feed').empty()
    })

    it('should change when new content is loaded', function (done) {
      /**
       * Feed before `loadFeed` function is empty
       */
      expect($('.feed').children().length).toBe(0)

      /**
       * Feed has content after `loadFeed` function has finished
       */
      loadFeed(0, function () {
        expect($('.feed').children().length).not.toBe(0)
        done()
      })
    })
  })

}())