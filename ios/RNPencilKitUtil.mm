//
//  RNPencilKitUtil.m
//  RNPencilKit
//
//  Created by mj on 5/4/24.
//

#import "RNPencilKitUtil.h"
#import "RNPencilKit.h"
#import <React/RCTBridge.h>
#import <React/RCTUIManager.h>

@implementation RNPencilKitUtil

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE()

- (dispatch_queue_t)methodQueue {
  return dispatch_get_main_queue();
}

- (void)getBase64Data:(double)viewId
              resolve:(RCTPromiseResolveBlock)resolve
               reject:(RCTPromiseRejectBlock)reject {
  RCTExecuteOnMainQueue(^{
    RNPencilKit* view = static_cast<RNPencilKit*>(
        [self.bridge.uiManager viewForReactTag:[NSNumber numberWithDouble:viewId]]);
    NSString* ret = [view getBase64Data];
    if (ret) {
      resolve(ret);
    } else {
      reject(@"RNPencilKit", @"failed to getBase64Data", [NSError new]);
    }
  });
}

- (void)saveDrawing:(double)viewId
               path:(NSString*)path
            resolve:(RCTPromiseResolveBlock)resolve
             reject:(RCTPromiseRejectBlock)reject {
  RCTExecuteOnMainQueue(^{
    RNPencilKit* view = static_cast<RNPencilKit*>(
        [self.bridge.uiManager viewForReactTag:[NSNumber numberWithDouble:viewId]]);
    NSString* ret = [view saveDrawing:path];
    if (ret) {
      resolve(ret);
    } else {
      reject(@"RNPencilKit", @"failed to saveDrawing", [NSError new]);
    }
  });
}

- (void)loadDrawing:(double)viewId
               path:(NSString*)path
            resolve:(RCTPromiseResolveBlock)resolve
             reject:(RCTPromiseRejectBlock)reject {
  RCTExecuteOnMainQueue(^{
    RNPencilKit* view = static_cast<RNPencilKit*>(
        [self.bridge.uiManager viewForReactTag:[NSNumber numberWithDouble:viewId]]);
    BOOL ret = [view loadDrawing:path];
    if (ret) {
      resolve(@"");
    } else {
      reject(@"RNPencilKit", @"failed to loadDrawing", [NSError new]);
    }
  });
}

- (void)loadBase64Data:(double)viewId
                base64:(NSString*)base64
               resolve:(RCTPromiseResolveBlock)resolve
                reject:(RCTPromiseRejectBlock)reject {
  RCTExecuteOnMainQueue(^{
    RNPencilKit* view = static_cast<RNPencilKit*>(
        [self.bridge.uiManager viewForReactTag:[NSNumber numberWithDouble:viewId]]);
    BOOL ret = [view loadBase64Data:base64];
    if (ret) {
      resolve(@"");
    } else {
      reject(@"RNPencilKit", @"failed to loadBase64Data", [NSError new]);
    }
  });
}

- (NSNumber*)isPencilKitAvailable {
  if (@available(iOS 14, *)) {
    return @(YES);
  } else {
    return @(NO);
  }
}

- (NSNumber*)isiOSEqualsOrGreaterThan17 {
  if (@available(iOS 17, *)) {
    return @(YES);
  } else {
    return @(NO);
  }
}

- (NSNumber*)isiOSEqualsOrGreaterThan16_4 {
  if (@available(iOS 16.4, *)) {
    return @(YES);
  } else {
    return @(NO);
  }
}

- (NSArray<NSString*>*)getAvailableTools {
  if ([self isPencilKitAvailable]) {
    if ([self isiOSEqualsOrGreaterThan17]) {
      return @[
        @"pen",
        @"pencil",
        @"marker",
        @"monoline",
        @"fountainPen",
        @"watercolor",
        @"crayon",
        @"eraserVector",
        @"eraserBitmap",
        @"eraserFixedWidthBitmap",
      ];
    } else {
      return @[
        @"pen",
        @"pencil",
        @"marker",
        @"eraserVector",
        @"eraserBitmap",
      ];
    }
  } else {
    return @[];
  }
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams&)params {
  return std::make_shared<facebook::react::NativeRNPencilKitUtilSpecJSI>(params);
}

@end
