import BaseLayout from './BaseLayout';
import React from 'react';
import { Card } from 'flowbite-react';
import Recommend from './recommend/Recommend';

const RecommendLayout = () => {
    return (
      <BaseLayout>
        <Recommend />
      </BaseLayout>
    );
  };
export default RecommendLayout;
