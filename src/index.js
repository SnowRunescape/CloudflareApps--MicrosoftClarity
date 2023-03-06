(function () {
  'use strict'

  function GenerateMicrosoftClarityHeadTag(clarity_id) {
    let script = `<!-- Microsoft Clarity -->
      <script type=\"text/javascript\">(function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src=\"https://www.clarity.ms/tag/\"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, \"clarity\", \"script\", \"CLARITY-XXX\");</script>
    <!-- End Microsoft Clarity -->`;

    return script.replace("CLARITY-XXX", clarity_id);
  }

  function InsertCodeIntoWebpage(clarity_id) {
    const HeadTag = document.head;
    const existing_HeadContent = HeadTag.innerHTML;

    HeadTag.innerHTML = GenerateMicrosoftClarityHeadTag(clarity_id) + existing_HeadContent;
  }

  function ExclusionCriteriaCheck(exclude_from_installing_Here) {
    if (exclude_from_installing_Here.length > 0) {
      for (let index = 0; index < exclude_from_installing_Here.length; index++) {
        if (exclude_from_installing_Here[index].length > 0) {
          const matches = document.location.href.match(exclude_from_installing_Here[index]);

          if (matches != undefined) {
            return true;
          } else {
            continue;
          }
        }
      }
    }

    return false;
  }

  function main() {
    const clarity_id = INSTALL_OPTIONS.clarity_id.trim();

    if (clarity_id === undefined) {
      console.error("CloudflareApps--MicrosoftClarity -- Missing ID");
      console.error("CloudflareApps--MicrosoftClarity -- installation on hold");
      return -1;
    }

    const exclude_from_installing_Here = INSTALL_OPTIONS.exclude_url;

    if (!ExclusionCriteriaCheck(exclude_from_installing_Here)) {
        InsertCodeIntoWebpage(clarity_id);
    }
  }

  main();
})()