//
//  RNPencilKitUtil.m
//  RNPencilKit
//
//  Created by mj on 5/4/24.
//

#import "RNPencilKitUtil.h"

@implementation RNPencilKitUtil

RCT_EXPORT_MODULE()

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
