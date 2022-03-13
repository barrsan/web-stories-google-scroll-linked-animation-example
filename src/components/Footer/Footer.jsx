import React from 'react';
import clsx from 'clsx';
import footerData from '@content/footer.yaml';

function Footer() {
  return (
    <footer
      className={clsx([
        'mt-24 h-[600px]',
        'flex items-center justify-center',
        'bg-slate-100',
      ])}
    >
      <div className="text-center">
        <p className="mb-3">{footerData.content.aboutProject}</p>
        <p className="mb-3">
          {footerData.content.aboutMediaSrc}{' '}
          <a
            className="border-b border-blue-600 text-blue-600"
            href={footerData.content.storiesGoogleUrl}
            target="_blank"
            rel="noreferrer"
          >
            {footerData.content.storiesGoogle}
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
