const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

// Custom image loading performance monitoring
export const reportImagePerformance = () => {
  if (typeof window !== 'undefined') {
    const images = document.querySelectorAll('img');
    let loadedImages = 0;
    const totalImages = images.length;

    const checkAllImagesLoaded = () => {
      loadedImages++;
      if (loadedImages === totalImages) {
        console.log('All images loaded successfully');
        // You can send this data to your analytics service
        if (window.gtag) {
          window.gtag('event', 'images_loaded', {
            total_images: totalImages,
            load_time: performance.now()
          });
        }
      }
    };

    images.forEach(img => {
      if (img.complete) {
        checkAllImagesLoaded();
      } else {
        img.addEventListener('load', checkAllImagesLoaded);
        img.addEventListener('error', checkAllImagesLoaded);
      }
    });
  }
};

export default reportWebVitals;
