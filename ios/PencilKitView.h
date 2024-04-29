// This guard prevent this file to be compiled in the old architecture.
#ifdef RCT_NEW_ARCH_ENABLED
#import <React/RCTViewComponentView.h>
#import <UIKit/UIKit.h>

#ifndef PencilKitViewNativeComponent_h
#define PencilKitViewNativeComponent_h

NS_ASSUME_NONNULL_BEGIN

@interface PencilKitView : RCTViewComponentView
@end

NS_ASSUME_NONNULL_END

#endif /* PencilKitViewNativeComponent_h */
#endif /* RCT_NEW_ARCH_ENABLED */
