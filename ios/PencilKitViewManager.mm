#import "RCTBridge.h"
#import <React/RCTUIManager.h>
#import <React/RCTViewManager.h>

@interface PencilKitViewManager : RCTViewManager
@end

@implementation PencilKitViewManager

RCT_EXPORT_MODULE(PencilKitView)

- (UIView*)view {
  return [[UIView alloc] init];
}

RCT_EXPORT_VIEW_PROPERTY(color, NSString)

@end
