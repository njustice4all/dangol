// @flow
import React from 'react';

type Props = {
  options: string,
  terms: string,
  setTerms: (type: string, value: string) => void,
};

const Textarea = ({ options, terms, setTerms }: Props) => {
  let type = 'policyCollectAgreeMemberText';
  if (options === 'use') {
    type = 'agreementText';
  } else if (options === 'personal') {
    type = 'policyText';
  }

  const height = window.innerHeight - 129;

  return (
    <div className="terms-contents">
      <div className="terms-textarea-wrapper" style={{ height }}>
        <textarea
          className="terms-textarea"
          value={terms}
          onChange={e => setTerms(type, e.target.value)}
        />
      </div>
    </div>
  );
};

export default Textarea;
