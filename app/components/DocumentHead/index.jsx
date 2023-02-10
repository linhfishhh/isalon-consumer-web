/**
 *
 * DocumentHead
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import { useGlobalConfig } from 'utils/hooks';
import { truncateWord, stripHTMLTags } from 'utils/stringFormat';

export const DEFAULT_IMAGE = `${window.location.origin}/ic_logo.png`;

const fbAppId = process.env.FACEBOOK_APP_ID;

function DocumentHead(props) {
  const { title, description, image } = props;
  const { globalConfig } = useGlobalConfig();

  const {
    theme_master_site_title: gTitle,
    theme_master_site_desc: gDescription,
  } = globalConfig;

  const finalDescription = description
    ? truncateWord(stripHTMLTags(description), 50)
    : description;

  return (
    <Helmet>
      <title>{title || gTitle}</title>
      <meta name="description" content={finalDescription || gDescription} />
      <link rel="canonical" href={window.location.href} />
      {/* facebook */}
      <meta property="og:url" content={window.location.href} />
      <meta property="og:title" content={title || gTitle} />
      <meta
        property="og:description"
        content={finalDescription || gDescription}
      />
      <meta property="og:image" content={image || DEFAULT_IMAGE} />
      <meta property="og:image:secure_url" content={image || DEFAULT_IMAGE} />
      <meta property="og:locale" content="vi_VN" />
      <meta property="og:site_name" content={gTitle} />
      <meta property="fb:app_id" content={fbAppId} />
      <meta
        property="article:author"
        content="https://www.facebook.com/iSalon.vn"
      />
    </Helmet>
  );
}

DocumentHead.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
};

export default memo(DocumentHead);
