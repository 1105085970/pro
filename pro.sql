/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50714
Source Host           : localhost:3306
Source Database       : pro

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2016-11-24 08:20:51
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for circles
-- ----------------------------
DROP TABLE IF EXISTS `circles`;
CREATE TABLE `circles` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '圈子编号',
  `userid` int(10) unsigned NOT NULL COMMENT '所属用户编号',
  `name` varchar(100) NOT NULL COMMENT '圈子名称',
  `dynamic` tinyint(2) NOT NULL DEFAULT '2' COMMENT '首页讯息串中的讯息数量。0没有1减少2标准3更多',
  `notice` tinyint(2) NOT NULL DEFAULT '1' COMMENT '是否获取有关新信息的通知。1获取0不获取',
  `follownum` int(10) unsigned NOT NULL COMMENT '圈子内的用户数量',
  `followid` text COMMENT '圈子内的用户编号列表，逗号分隔',
  `addtime` int(10) NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of circles
-- ----------------------------

-- ----------------------------
-- Table structure for collections
-- ----------------------------
DROP TABLE IF EXISTS `collections`;
CREATE TABLE `collections` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '收藏集编号',
  `title` varchar(100) NOT NULL COMMENT '收藏集标题',
  `slogan` varchar(500) DEFAULT NULL COMMENT '收藏集标语',
  `addtime` int(10) unsigned NOT NULL COMMENT '创建时间',
  `userid` int(11) NOT NULL COMMENT '所属用户编号',
  `circleid` varchar(500) DEFAULT NULL COMMENT '有权查看的圈子编号列表，逗号分隔',
  `peopleid` varchar(500) DEFAULT NULL COMMENT '有权查看的用户编号列表，逗号分隔',
  `hide` tinyint(2) NOT NULL DEFAULT '0' COMMENT '是否仅自己可见。1仅自己可见',
  `fansnum` int(11) NOT NULL DEFAULT '0' COMMENT '粉丝数量',
  `fans` text COMMENT '粉丝编号列表，逗号分隔',
  `postnum` int(11) NOT NULL DEFAULT '0' COMMENT '收藏集内帖子数量',
  `picid` int(11) DEFAULT '1' COMMENT '收藏集图片编号',
  `background` varchar(100) NOT NULL COMMENT '收藏集背景色',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of collections
-- ----------------------------
INSERT INTO `collections` VALUES ('36', ' 一个淘宝女装商家对淘宝的控诉', ' 一个淘宝女装商家对淘宝的控诉', '1479920184', '9', null, null, '0', '3', '10,11,25,', '0', '62', '#EB3F79');
INSERT INTO `collections` VALUES ('37', '微历史', 'The Staffordshire Bull Terrier was developed in the region of Staffordshire, England,', '1479920523', '9', null, null, '0', '0', '', '0', '64', '#A900FF');
INSERT INTO `collections` VALUES ('38', 'everyone hi a lovely day', 'Taking a break during a walk.﻿', '1479920579', '9', null, null, '0', '1', '10,', '0', '64', '#7D56C1');
INSERT INTO `collections` VALUES ('39', '美国福布斯是这样介绍马云', '美国福布斯是这样介绍马云', '1479920802', '10', null, null, '0', '2', '11,9,', '0', '66', '#679E37');
INSERT INTO `collections` VALUES ('40', 'The German Shepherd (German: Deutscher Schäferhund, German pronunciation', 'The German Shepherd (German: Deutscher Schäferhund, German pronunciation', '1479920842', '10', null, null, '0', '0', null, '0', '67', '#00887A');
INSERT INTO `collections` VALUES ('41', 'The German Shepherd ', 'The German Shepherd ', '1479921137', '11', null, null, '0', '2', '9,25,', '0', '68', '#1D87E4');
INSERT INTO `collections` VALUES ('42', '新盈利模式，汩汩而出。', '新盈利模式，汩汩而出。', '1479923334', '25', null, null, '0', '0', null, '0', '72', '#7D56C1');

-- ----------------------------
-- Table structure for comments
-- ----------------------------
DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '评论编号',
  `userid` int(10) unsigned NOT NULL COMMENT '所属用户编号',
  `postid` int(10) unsigned NOT NULL COMMENT '所属帖子编号',
  `content` text COMMENT '评论内容',
  `picid` int(11) DEFAULT NULL COMMENT '图片编号',
  `linkid` int(11) DEFAULT NULL COMMENT '链接编号',
  `likes` int(11) NOT NULL DEFAULT '0' COMMENT '喜欢的数量',
  `likeuserid` text COMMENT '喜欢的用户编号列表，逗号分隔',
  `parentid` int(11) NOT NULL DEFAULT '0' COMMENT '父级评论编号',
  `path` varchar(255) NOT NULL DEFAULT '0' COMMENT '父级编号层级拼接',
  `addtime` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of comments
-- ----------------------------
INSERT INTO `comments` VALUES ('5', '9', '10', '加油毛毛！', null, null, '0', null, '0', '0,', '1479915270');
INSERT INTO `comments` VALUES ('6', '10', '11', '加油王保！', null, null, '0', null, '0', '0,', '1479915409');
INSERT INTO `comments` VALUES ('7', '11', '12', 'Handsome boy lovely', null, null, '0', null, '0', '0,', '1479915982');
INSERT INTO `comments` VALUES ('8', '12', '12', '你可能会喜欢的社群', null, null, '0', null, '0', '0,', '1479916032');
INSERT INTO `comments` VALUES ('9', '12', '11', '尖子生是怎样炼成的？', null, null, '0', null, '0', '0,', '1479916057');
INSERT INTO `comments` VALUES ('10', '12', '10', '科学家在实验室养成的肠道组织在老鼠体内茁壮', null, null, '0', null, '0', '0,', '1479916077');
INSERT INTO `comments` VALUES ('11', '12', '13', '宝贝好可爱', null, null, '0', null, '0', '0,', '1479916240');
INSERT INTO `comments` VALUES ('12', '13', '14', 'The breed\'s officially recognized name is German Shepherd Dog in the English language, sometimes abbreviated as GSD and was also formerly known as the Alsatian in Britain.', null, null, '0', null, '0', '0,', '1479916558');
INSERT INTO `comments` VALUES ('13', '13', '13', 'The breed\'s officially recognized name is German Shepherd Dog in the English language, sometimes abbreviated as GSD and was also formerly known as the Alsatian in Britain.', null, null, '0', null, '0', '0,', '1479916575');
INSERT INTO `comments` VALUES ('14', '13', '11', 'The breed\'s officially recognized name is German Shepherd Dog in the English language, sometimes abbreviated as GSD and was also formerly known as the Alsatian in Britain.', null, null, '0', null, '0', '0,', '1479916582');
INSERT INTO `comments` VALUES ('15', '13', '14', '写小说本不想幽默', null, null, '0', null, '0', '0,', '1479916658');
INSERT INTO `comments` VALUES ('16', '14', '15', 'The girls snuggling with us after a long weekend being boarded at the vet.', null, null, '0', null, '0', '0,', '1479916786');
INSERT INTO `comments` VALUES ('17', '15', '16', '向中国叩头  脸书研发审查工具\n\n图片：2016年3月18日扎克伯格和一小群人在北京天安门前慢跑\nFacebook创办人扎克伯格（Mark Zuckerberg）为了让脸书进军中国，不仅用自己的肺帮中国过滤雾霾，在雾霾天里在北京路跑，还打算配合中国审查制度，编写能封锁特定内容的程式。', null, null, '0', null, '0', '0,', '1479917071');
INSERT INTO `comments` VALUES ('18', '15', '16', 'qqq', null, null, '0', null, '17', '0,17,', '1479917132');
INSERT INTO `comments` VALUES ('19', '16', '17', '这不是一个笑话，而是一个严肃的话题', null, null, '0', null, '0', '0,', '1479917257');
INSERT INTO `comments` VALUES ('20', '19', '18', '近日一名教授在微博上发表题为“中国的防火墙是不是弄反了？', null, null, '0', null, '0', '0,', '1479917881');
INSERT INTO `comments` VALUES ('21', '19', '19', 'Chocolate Labradors', null, null, '0', null, '0', '0,', '1479918002');
INSERT INTO `comments` VALUES ('22', '20', '20', '话说二郎神与众仙斗法，将哮天犬变成玉皇大帝，就连王母也分辨不出。王母唯恐闹出事端，只好向佛祖求教该如何辨认？\n佛祖说：江山易改本性难移，样貌可以幻化，本性不会改变。\n你让嫦娥赤身裸体端包子给他俩送去，两眼直勾勾看女人的那个就是老皇帝，只知道吃包子的那个就是狗！', null, null, '0', null, '0', '0,', '1479919209');
INSERT INTO `comments` VALUES ('23', '20', '20', '江山易改本性难移', null, null, '0', null, '22', '0,22,', '1479919218');
INSERT INTO `comments` VALUES ('24', '21', '21', ' Odin wishes you a good day. A fine walk in the forest with a little bit ice bathing before trip to the veterinary for checking his tonsils, no more antibiotics wait and see. ', null, null, '0', null, '0', '0,', '1479919333');
INSERT INTO `comments` VALUES ('25', '23', '22', '邮箱里收到这封很特别的邮件，目标直指最红最火的淘宝，淘宝现在天下无敌，', null, null, '0', null, '0', '0,', '1479919454');
INSERT INTO `comments` VALUES ('26', '25', '24', '新盈利模式，汩汩而出。', null, null, '0', null, '0', '0,', '1479923356');

-- ----------------------------
-- Table structure for commoption
-- ----------------------------
DROP TABLE IF EXISTS `commoption`;
CREATE TABLE `commoption` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '类别编号',
  `userid` int(10) unsigned NOT NULL COMMENT '所属用户编号',
  `commid` int(11) DEFAULT NULL COMMENT '所属社区编号',
  `dynamic` tinyint(4) NOT NULL DEFAULT '2' COMMENT '首页讯息串中的讯息数量。0没有1减少2标准3更多',
  `sort` tinyint(4) NOT NULL DEFAULT '1' COMMENT '帖子排序方式1热门2新帖',
  `notice` tinyint(4) NOT NULL DEFAULT '1' COMMENT '是否获取有关新信息的通知。1获取0不获取',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of commoption
-- ----------------------------

-- ----------------------------
-- Table structure for commtypes
-- ----------------------------
DROP TABLE IF EXISTS `commtypes`;
CREATE TABLE `commtypes` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '类别编号',
  `commid` int(11) DEFAULT NULL COMMENT '所属社区编号',
  `name` varchar(100) NOT NULL COMMENT '类别名称',
  `parentid` int(11) NOT NULL DEFAULT '0' COMMENT '父级类别编号',
  `path` varchar(300) NOT NULL DEFAULT '0,' COMMENT '父级编号层级拼接',
  `addtime` int(11) NOT NULL,
  `postnum` int(11) NOT NULL DEFAULT '0' COMMENT '类别内帖子数量',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of commtypes
-- ----------------------------

-- ----------------------------
-- Table structure for communities
-- ----------------------------
DROP TABLE IF EXISTS `communities`;
CREATE TABLE `communities` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '社区编号',
  `title` varchar(100) NOT NULL COMMENT '社区标题',
  `slogan` varchar(500) DEFAULT NULL COMMENT '社区标语',
  `addtime` int(11) NOT NULL COMMENT '创建时间',
  `userid` int(10) unsigned NOT NULL COMMENT '所属用户编号',
  `hide` tinyint(4) NOT NULL DEFAULT '0' COMMENT '是否仅自己可见。1仅自己可见',
  `examineuser` text COMMENT '需要审核的会员加入请求列表，逗号分隔',
  `search` tinyint(4) NOT NULL DEFAULT '1' COMMENT '不可见时允许搜索社区并加入。1允许0禁止',
  `admins` varchar(200) DEFAULT NULL COMMENT '社区管理员编号列表，逗号分隔',
  `examinepost` tinyint(4) NOT NULL DEFAULT '0' COMMENT '是否开启新帖审核。1审核0不审核',
  `membernum` int(11) NOT NULL DEFAULT '0' COMMENT '成员数量',
  `members` text COMMENT '成员编号列表，逗号分隔',
  `invitation` varchar(500) DEFAULT NULL COMMENT '想邀请的加入的用户编号列表，逗号分隔',
  `picid` int(11) DEFAULT '1' COMMENT '社区图片编号',
  `describe` text COMMENT '社区描述',
  `linkid` varchar(500) DEFAULT NULL COMMENT '链接编号列表，逗号分隔',
  `typeid` varchar(300) DEFAULT NULL COMMENT '类别编号列表，逗号分隔',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of communities
-- ----------------------------

-- ----------------------------
-- Table structure for files
-- ----------------------------
DROP TABLE IF EXISTS `files`;
CREATE TABLE `files` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '文件编号',
  `name` varchar(100) DEFAULT NULL COMMENT '文件名',
  `extension` varchar(100) DEFAULT NULL COMMENT '文件扩展名',
  `userid` int(11) NOT NULL COMMENT '所属用户编号',
  `path` varchar(300) DEFAULT NULL COMMENT '文件保存路径',
  `state` tinyint(2) NOT NULL DEFAULT '1' COMMENT '文件状态。1正常0回收站',
  `addtime` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of files
-- ----------------------------
INSERT INTO `files` VALUES ('24', '24', 'image/jpeg', '9', '/files/2016/11/23/9/24.jpg', '1', '1479915220');
INSERT INTO `files` VALUES ('25', '25', 'image/jpeg', '10', '/files/2016/11/23/10/25.jpg', '1', '1479915378');
INSERT INTO `files` VALUES ('26', '26', 'image/jpeg', '10', '/files/2016/11/23/10/26.jpg', '1', '1479915537');
INSERT INTO `files` VALUES ('27', '27', 'image/jpeg', '10', '/files/2016/11/23/10/27.jpg', '1', '1479915555');
INSERT INTO `files` VALUES ('28', '28', 'image/jpeg', '11', '/files/2016/11/23/11/28.jpg', '1', '1479915805');
INSERT INTO `files` VALUES ('29', '29', 'image/jpeg', '11', '/files/2016/11/23/11/29.jpg', '1', '1479915911');
INSERT INTO `files` VALUES ('30', '30', 'image/jpeg', '11', '/files/2016/11/23/11/30.jpg', '1', '1479915924');
INSERT INTO `files` VALUES ('31', '31', 'image/jpeg', '12', '/files/2016/11/23/12/31.jpg', '1', '1479916104');
INSERT INTO `files` VALUES ('32', '32', 'image/jpeg', '12', '/files/2016/11/23/12/32.jpg', '1', '1479916117');
INSERT INTO `files` VALUES ('33', '33', 'image/jpeg', '12', '/files/2016/11/23/12/33.jpg', '1', '1479916211');
INSERT INTO `files` VALUES ('34', '34', 'image/jpeg', '9', '/files/2016/11/23/9/34.jpg', '1', '1479916405');
INSERT INTO `files` VALUES ('35', '35', 'image/jpeg', '9', '/files/2016/11/23/9/35.jpg', '1', '1479916422');
INSERT INTO `files` VALUES ('36', '36', 'image/jpeg', '13', '/files/2016/11/23/13/36.jpg', '1', '1479916529');
INSERT INTO `files` VALUES ('37', '37', 'image/jpeg', '13', '/files/2016/11/23/13/37.jpg', '1', '1479916605');
INSERT INTO `files` VALUES ('38', '38', 'image/jpeg', '13', '/files/2016/11/23/13/38.jpg', '1', '1479916616');
INSERT INTO `files` VALUES ('39', '39', 'image/jpeg', '14', '/files/2016/11/23/14/39.jpg', '1', '1479916765');
INSERT INTO `files` VALUES ('40', '40', 'image/jpeg', '14', '/files/2016/11/23/14/40.jpg', '1', '1479916832');
INSERT INTO `files` VALUES ('41', '41', 'image/jpeg', '14', '/files/2016/11/23/14/41.jpg', '1', '1479916843');
INSERT INTO `files` VALUES ('42', '42', 'image/jpeg', '15', '/files/2016/11/23/15/42.jpg', '1', '1479916938');
INSERT INTO `files` VALUES ('43', '43', 'image/jpeg', '15', '/files/2016/11/23/15/43.jpg', '1', '1479916949');
INSERT INTO `files` VALUES ('44', '44', 'image/jpeg', '15', '/files/2016/11/23/15/44.jpg', '1', '1479916998');
INSERT INTO `files` VALUES ('45', '45', 'image/jpeg', '16', '/files/2016/11/23/16/45.jpg', '1', '1479917217');
INSERT INTO `files` VALUES ('46', '46', 'image/jpeg', '16', '/files/2016/11/23/16/46.jpg', '1', '1479917269');
INSERT INTO `files` VALUES ('47', '47', 'image/jpeg', '16', '/files/2016/11/23/16/47.jpg', '1', '1479917279');
INSERT INTO `files` VALUES ('48', '48', 'image/jpeg', '17', '/files/2016/11/23/17/48.jpg', '1', '1479917486');
INSERT INTO `files` VALUES ('49', '49', 'image/jpeg', '17', '/files/2016/11/23/17/49.jpg', '1', '1479917496');
INSERT INTO `files` VALUES ('50', '50', 'image/jpeg', '18', '/files/2016/11/23/18/50.jpg', '1', '1479917600');
INSERT INTO `files` VALUES ('51', '51', 'image/jpeg', '18', '/files/2016/11/23/18/51.jpg', '1', '1479917611');
INSERT INTO `files` VALUES ('52', '52', 'image/jpeg', '18', '/files/2016/11/23/18/52.jpg', '1', '1479917809');
INSERT INTO `files` VALUES ('53', '53', 'image/jpeg', '19', '/files/2016/11/23/19/53.jpg', '1', '1479917907');
INSERT INTO `files` VALUES ('54', '54', 'image/jpeg', '19', '/files/2016/11/23/19/54.png', '1', '1479919013');
INSERT INTO `files` VALUES ('55', '55', 'image/jpeg', '20', '/files/2016/11/23/20/55.jpeg', '1', '1479919110');
INSERT INTO `files` VALUES ('56', '56', 'image/jpeg', '20', '/files/2016/11/23/20/56.jpg', '1', '1479919165');
INSERT INTO `files` VALUES ('57', '57', 'image/jpeg', '20', '/files/2016/11/23/20/57.jpg', '1', '1479919172');
INSERT INTO `files` VALUES ('58', '58', 'image/jpeg', '21', '/files/2016/11/23/21/58.jpg', '1', '1479919293');
INSERT INTO `files` VALUES ('59', '59', 'image/jpeg', '21', '/files/2016/11/23/21/59.jpg', '1', '1479919311');
INSERT INTO `files` VALUES ('60', '60', 'image/jpeg', '21', '/files/2016/11/23/21/60.jpg', '1', '1479919319');
INSERT INTO `files` VALUES ('61', '61', 'image/jpeg', '23', '/files/2016/11/23/23/61.jpeg', '1', '1479919393');
INSERT INTO `files` VALUES ('62', '62', 'image/jpeg', '23', '/files/2016/11/23/23/62.jpg', '1', '1479919417');
INSERT INTO `files` VALUES ('63', null, null, '9', '/images/1479920184WqLQS9.jpg', '1', null);
INSERT INTO `files` VALUES ('64', null, null, '9', '/images/1479920523PssEGd.png', '1', null);
INSERT INTO `files` VALUES ('65', null, null, '9', '/images/1479920579IvqIs4.jpg', '1', null);
INSERT INTO `files` VALUES ('66', null, null, '10', '/images/1479920802344yzZ.jpg', '1', null);
INSERT INTO `files` VALUES ('67', null, null, '10', '/images/1479920842EUXuJ9.jpg', '1', null);
INSERT INTO `files` VALUES ('68', null, null, '11', '/images/1479921137qjxlsR.jpg', '1', null);
INSERT INTO `files` VALUES ('69', '69', 'image/jpeg', '9', '/files/2016/11/23/9/69.jpg', '1', '1479921471');
INSERT INTO `files` VALUES ('70', '70', 'image/jpeg', '25', '/files/2016/11/24/25/70.jpg', '1', '1479923205');
INSERT INTO `files` VALUES ('71', '71', 'image/jpeg', '25', '/files/2016/11/24/25/71.jpg', '1', '1479923229');
INSERT INTO `files` VALUES ('72', null, null, '25', '/images/14799233348bd5vw.jpg', '1', null);

-- ----------------------------
-- Table structure for links
-- ----------------------------
DROP TABLE IF EXISTS `links`;
CREATE TABLE `links` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '链接编号',
  `name` varchar(100) NOT NULL COMMENT '网站名称',
  `url` varchar(300) NOT NULL COMMENT '网站网址',
  `picture` varchar(300) DEFAULT NULL COMMENT '图片保存路径',
  `addtime` int(10) NOT NULL COMMENT '添加时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of links
-- ----------------------------

-- ----------------------------
-- Table structure for notice
-- ----------------------------
DROP TABLE IF EXISTS `notice`;
CREATE TABLE `notice` (
  `id` int(10) unsigned NOT NULL COMMENT '通知编号',
  `userid` int(11) NOT NULL COMMENT '所属用户编号',
  `addtime` int(11) NOT NULL,
  `launchuser` int(11) NOT NULL COMMENT '发起的用户编号',
  `postid` int(11) NOT NULL COMMENT '帖子编号',
  `commentid` int(11) NOT NULL COMMENT '评论编号',
  `vateid` int(11) NOT NULL COMMENT '投票编号',
  `collid` int(11) NOT NULL COMMENT '收藏集编号',
  `commid` int(11) NOT NULL COMMENT '社区编号',
  `type` varchar(255) DEFAULT NULL COMMENT '事件类型',
  `explain` text COMMENT '事件说明',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of notice
-- ----------------------------

-- ----------------------------
-- Table structure for posts
-- ----------------------------
DROP TABLE IF EXISTS `posts`;
CREATE TABLE `posts` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '帖子编号',
  `title` varchar(100) DEFAULT NULL COMMENT '帖子标题',
  `abstract` varchar(500) DEFAULT NULL COMMENT '帖子摘要',
  `content` text COMMENT '帖子内容',
  `addtime` int(10) unsigned NOT NULL COMMENT '添加时间',
  `userid` int(10) unsigned NOT NULL COMMENT '所属用户编号',
  `type` tinyint(2) unsigned NOT NULL DEFAULT '1' COMMENT '帖子类型。1文字2图片3链接4投票5文章',
  `picid` varchar(500) DEFAULT NULL COMMENT '图片编号列表，逗号分隔',
  `fileid` varchar(300) DEFAULT NULL COMMENT '附件编号列表，逗号分隔',
  `linkid` varchar(300) DEFAULT NULL COMMENT '链接编号列表，逗号分隔',
  `voteid` varchar(500) DEFAULT NULL COMMENT '投票编号列表，逗号分隔',
  `collid` int(10) unsigned DEFAULT NULL COMMENT '所属收藏集编号',
  `commid` int(11) DEFAULT NULL COMMENT '所属社区编号',
  `commtypeid` int(11) DEFAULT NULL COMMENT '所属社区类别编号',
  `circleid` varchar(500) DEFAULT NULL COMMENT '有权查看的圈子编号列表，逗号分隔',
  `peopleid` varchar(500) DEFAULT NULL COMMENT '有权查看的用户编号列表，逗号分隔',
  `comments` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '评论的数量',
  `nocomment` tinyint(2) NOT NULL DEFAULT '1' COMMENT '禁止评论 1允许 0禁止',
  `noshare` tinyint(2) NOT NULL DEFAULT '1' COMMENT '禁止分享 1允许 0禁止',
  `likes` int(11) NOT NULL DEFAULT '0' COMMENT '喜欢的数量',
  `likeuserid` text COMMENT '喜欢的用户编号列表，逗号分隔',
  `shares` int(11) NOT NULL DEFAULT '0' COMMENT '分享的数量',
  `fixed` tinyint(4) NOT NULL DEFAULT '0' COMMENT '是否固定到顶部 1固定 0禁',
  `state` tinyint(4) NOT NULL DEFAULT '1' COMMENT '帖子状态。1正常0回收站2待审核',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of posts
-- ----------------------------
INSERT INTO `posts` VALUES ('10', null, null, 'Temperament\nThe Staffordshire Bull Terrier does everything full throttle: play, work and love. It is extremely courageous and obedient, affectionate with a sense of humor. One owner of this breed says, \"Staffordshire Bull Terriers are very people friendly. They are not particularly wary of strangers in almost all circumstances—although I\'ve heard a few anecdotes about some being wary of particular people. My dogs are always happy to meet new people!\" The breed’s reputation ', '1479915244', '9', '2', '24', null, null, null, null, null, null, null, null, '2', '1', '1', '4', '9,10,11,12', '0', '0', '1');
INSERT INTO `posts` VALUES ('11', null, null, '什么是西藏的当务之急\n——保护西藏的生态环境\n\n什么是西藏的当务之急？西藏自治区的新党委书记吴英杰认为“深入开展对达赖集团斗争、实现社会局势持续稳定长期稳定全面稳定”是首要政治任务。笔者以为保护西藏的生态环境是当务之急，西藏高原并非世界上生态环境保护的最好的地方，而是世界上生态环境破坏最严重的地方，气温上升，冰川雪山融化，草原退化，沙漠化扩大，水质下降', '1479915384', '10', '2', '25', null, null, null, null, null, null, null, null, '3', '1', '1', '3', '10,11,12', '0', '0', '1');
INSERT INTO `posts` VALUES ('12', null, null, '誰的歌聲輕輕、輕輕唱，\n誰的淚水靜靜淌。\n那些年華都付作過往，\n他們偎依著彼此說好要面對風浪。\n\n又是一地枯黃，楓葉紅了滿面秋霜。\n這場故夢裡，人生如戲唱，\n還有誰登場。', '1479915812', '11', '2', '28', null, null, null, null, null, null, null, null, '2', '1', '1', '3', '11,12,13', '0', '0', '1');
INSERT INTO `posts` VALUES ('13', null, null, 'The German Shepherd (German: Deutscher Schäferhund, German pronunciation: [ˈʃɛːfɐˌhʊnt]) is a breed of medium to large-sized working dog that originated in Germany. The breed\'s officially recognized name is German Shepherd Dog in the English language, sometimes abbreviated as GSD and was also formerly known as the Alsatian in Britain.', '1479916217', '12', '2', '33', null, null, null, null, null, null, null, null, '2', '1', '1', '2', '12,9', '0', '0', '1');
INSERT INTO `posts` VALUES ('14', null, null, 'German Shepherd is a relatively new breed of dog, with their origin dating to 1899. As part of the Herding Group, German Shepherds are working dogs developed originally for herding sheep. Since that time, however, because of their strength, intelligence, trainability, and obedience, German Shepherds around the world are often the preferred breed for many types of work, including disability assistance, search-and-rescue, police and military roles, and even acting.', '1479916539', '13', '2', '36', null, null, null, null, null, null, null, null, '2', '1', '1', '1', '13', '0', '0', '1');
INSERT INTO `posts` VALUES ('15', null, null, '刘震云：写小说本不想幽默\n\n图片：刘震云在今年的“中国时代（China Time）”活动期间出席朗诵会\n在被中国媒体称为“刘震云月”的11月里，中国作家刘震云短暂现身德国。他谈到中国式审查、万达和华谊之间的矛盾以及中国的高速发展。', '1479916770', '14', '2', '39', null, null, null, null, null, null, null, null, '1', '1', '1', '1', '14', '0', '0', '1');
INSERT INTO `posts` VALUES ('16', null, null, 'BUTTERFLY GIF OR YOU SWEET FRIEND !!\nI Love You my Friend !\n', '1479917020', '15', '2', '44', null, null, null, null, null, null, null, null, '2', '1', '1', '1', '15', '0', '0', '1');
INSERT INTO `posts` VALUES ('17', null, null, '近日一名教授在微博上发表题为“中国的防火墙是不是弄反了？”的文章，引来不少民众的共鸣。文章说：爬过几次长城，发现一个规律，朝外那一面的城墙险峻，敌人爬上来不容易；而朝内的一面都比较平缓，自己上去防御比较容易。而现在中国的防火墙呢？好像是专门和自己过不去。﻿', '1479917223', '16', '2', '45', null, null, null, null, null, null, null, null, '1', '1', '1', '1', '16', '0', '0', '1');
INSERT INTO `posts` VALUES ('18', null, null, '〖微博谈〗20161123\n1.@报社V香港：少扯什么“落后就要挨打”。如果一个人活在世上，周围所有的人都想揍他，绝不是因为他落后，而是因为他欠揍。国家亦然。', '1479917814', '18', '2', '52', null, null, null, null, null, null, null, null, '1', '1', '1', '1', '19', '0', '0', '1');
INSERT INTO `posts` VALUES ('19', null, null, '在菜场与菜贩子发生了有趣的对话。我问，这白梗韭菜怎么涨到20块一斤了，太贵了。菜贩说，这人民币眼看要破7了，涨这么多是应该的。我说，可我工资没涨啊。贩子说，所以还是自己做老板好，记住，现在这世道，手里要有实物，不要拿着人民币。还别说，我觉得这位小老板给我上的这堂课还是挺有益的。', '1479917984', '19', '2', '53', null, null, null, null, null, null, null, null, '1', '1', '1', '1', '19', '0', '0', '1');
INSERT INTO `posts` VALUES ('20', null, null, '话说二郎神与众仙斗法，将哮天犬变成玉皇大帝，就连王母也分辨不出。王母唯恐闹出事端，只好向佛祖求教该如何辨认？\n佛祖说：江山易改本性难移，样貌可以幻化，本性不会改变。\n你让嫦娥赤身裸体端包子给他俩送去，两眼直勾勾看女人的那个就是老皇帝，只知道吃包子的那个就是狗！', '1479919115', '20', '2', '55', null, null, null, null, null, null, null, null, '2', '1', '1', '0', null, '0', '0', '1');
INSERT INTO `posts` VALUES ('21', null, null, ' Odin wishes you a good day. A fine walk in the forest with a little bit ice bathing before trip to the veterinary for checking his tonsils, no more antibiotics wait and see. ', '1479919297', '21', '2', '58', null, null, null, null, null, null, null, null, '1', '1', '1', '0', null, '0', '0', '1');
INSERT INTO `posts` VALUES ('22', null, null, '邮箱里收到这封很特别的邮件，目标直指最红最火的淘宝，淘宝现在天下无敌，但类似的花招耍多了，总会被吃瓜群众所唾弃！以下内容是否属实，读者自行判断。', '1479919397', '23', '2', '61', null, null, null, null, null, null, null, null, '1', '1', '1', '1', '23', '0', '0', '1');
INSERT INTO `posts` VALUES ('23', null, null, 'The breed\'s officially recognized name is German Shepherd Dog in the English language, sometimes abbreviated as GSD and was also formerly known as the Alsatian in Britain.[', '1479921477', '9', '2', '69', null, null, null, null, null, null, null, null, '0', '1', '1', '1', '9', '0', '0', '1');
INSERT INTO `posts` VALUES ('24', null, null, '中国正在积累起巨大的假创新泡沫\n\n创新、创新、创新！\n\n这口号一浪高过一浪，媒体连篇累牍创新的重大意义，推介创新模范', '1479923211', '25', '2', '70', null, null, null, null, null, null, null, null, '1', '1', '1', '1', '25', '0', '0', '1');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '用户编号',
  `username` varchar(100) NOT NULL COMMENT '用户名',
  `password` varchar(255) NOT NULL COMMENT '密码',
  `phone` varchar(11) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `state` tinyint(2) NOT NULL DEFAULT '1' COMMENT '用户状态。0禁用、1未激活2正常3管理员',
  `picid` int(11) DEFAULT NULL COMMENT '头像图片编号',
  `sex` tinyint(2) NOT NULL DEFAULT '0' COMMENT '性别。0保密1男2女',
  `shield` text COMMENT '被屏蔽的用户编号列表，逗号分隔',
  `ignore` text COMMENT '被忽略的用户编号列表，逗号分隔',
  `followusers` text COMMENT '关注的用户编号列表，逗号分隔',
  `dynamic` tinyint(4) NOT NULL DEFAULT '2' COMMENT '首页讯息串中的讯息数量。0没有1减少2标准3更多',
  `notice` tinyint(4) NOT NULL DEFAULT '1' COMMENT '是否获取有关新信息的通知。1获取0不获取',
  `followcoll` text COMMENT '关注的合集编号列表，逗号分隔',
  `followcomm` text COMMENT '关注的社区编号列表，逗号分隔',
  `circle` text COMMENT '我的圈子编号列表，逗号分隔',
  `postnum` int(11) NOT NULL DEFAULT '0' COMMENT '用户发表的帖子数量',
  `background` int(11) DEFAULT NULL COMMENT '背景图片编号',
  `slogan` varchar(500) DEFAULT NULL COMMENT '用户个性宣言',
  `showcoll` tinyint(4) NOT NULL DEFAULT '0' COMMENT '是否公开你关注的收藏集 1显示0隐藏',
  `showcomm` text COMMENT '想公开的你收藏的社区编号列表，逗号分隔',
  `visit` int(11) NOT NULL DEFAULT '0' COMMENT '主页被访问次数',
  `created_at` datetime DEFAULT NULL COMMENT '注册时间',
  `nickname` varchar(100) DEFAULT NULL COMMENT '用户昵称',
  `birthday` int(11) DEFAULT NULL COMMENT '生日时间戳',
  `birth` varchar(100) DEFAULT NULL COMMENT '出生地',
  `residence` varchar(100) DEFAULT NULL COMMENT '居住地',
  `introduce` varchar(500) DEFAULT NULL COMMENT '个人简介',
  `token` varchar(100) NOT NULL COMMENT '令牌。忘记密码验证',
  `remember_token` varchar(100) DEFAULT NULL COMMENT '用于存储“记住我”令牌',
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '用户更新时间',
  `fans` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('9', 'peisijia', '$2y$10$XxUPG5jdE5/reilnSwGI9OWW3IsjiVAdpzlluVCpkM9BlegGSUDdi', '15141099036', '123456@qq.com', '4', '34', '2', null, null, null, '2', '1', '39,41,', null, null, '0', '35', 'peisijia', '0', null, '0', '2016-11-23 23:07:58', 'peisijia', null, null, null, '真的没有什么不可能！', 'ja3tKnU6yRIuLcDETlzghHHO1UHyR0b1UOelMUC2kGUbbLgkgO', 'u3CuXYC3MFycieL5SE7K8u0lHYU0REYouMeec9oPcUHEG9YggjpOzvopl5nL', '2016-11-24 02:50:00', null);
INSERT INTO `users` VALUES ('10', 'wangbao', '$2y$10$7RH1cFOI6.FqLUhnKA0qT.DuTkdghtVy352r00MnlAi3SaiNDD.zW', '13111111111', '1234567@qq.com', '3', '25', '0', null, null, null, '2', '1', '36,38,', null, null, '0', '27', '王保', '0', null, '0', '2016-11-23 23:09:45', '王保', null, null, null, '无兄弟不编程！', '65eKGdUEpCM1TLpXkJKltouMUek0gD6iGrDT8jM02eWH6ahDR6', 'XhD02PaHjB3bDVU6suUIqLHbmmmx5v9IG9j5yzY8ts4RKsJveWLmBMNsbnUI', '2016-11-24 01:10:22', null);
INSERT INTO `users` VALUES ('11', 'aaa', '$2y$10$ORSbHFjgSLlMGckBu4Ks8uY.PXBXYE.OsjX1fyfYOFbzMEB909vw6', '13111111112', 'aaa@qq.com', '1', '29', '0', null, null, null, '2', '1', '36,39,', null, null, '0', '30', 'aaa', '0', null, '0', '2016-11-23 23:11:22', 'aaa', null, null, null, '我爱兄弟连', 'HqOGBL7gq8xrMApTCLSsIkLjhP4rEjlooGdkIwvKSmjszfaAuN', 'xDDFmbVdVerxV31jspozF0d0xc7WQW0ha57qsXWzs78fYPUTCDc9xamo3Ljf', '2016-11-24 01:12:46', null);
INSERT INTO `users` VALUES ('12', 'bbb', '$2y$10$4SuRPF6YTg.qvv29tE.i.OD0q4Zcz6aLcXoqMLuoJ/HxFncPHAUxW', '13111111113', 'bbb@qq.com', '1', '32', '0', null, null, null, '2', '1', null, null, null, '0', '31', 'bbb', '0', null, '0', '2016-11-23 23:12:09', 'bbb', null, null, null, 'The German Shepherd (German: Deutscher Schäferhund, ', 'LCd4zoMPQWibsuEGI0LhK2ZOF4R68QRnrgxlX2ejgWP7hPNmmT', 'XqS7phKoMOHHpJHLOfRWuhhi1eJ7b2ZCuB8Yj1eMd0IPxVGHNRtyUh4v8UJi', '2016-11-23 23:51:09', null);
INSERT INTO `users` VALUES ('13', 'ccc', '$2y$10$gdnH6mbwIHAsBuChHhQWmO7u6QFLA5XaCUxZ9yI3wNKcs19ezAM9S', '13111111114', 'ccc@qq.com', '1', '37', '0', null, null, null, '2', '1', null, null, null, '0', '38', 'ccc', '0', null, '0', '2016-11-23 23:12:42', 'ccc', null, null, null, '写小说本不想幽默', 'RCSuUKaxL1mwZXnM8nJfv91p7er88BtAUtfIZoLrtLP2UWD1Ft', 'XAMPxrsEPo2Y2qt9hyqfagJNzsfOaMVgWTJ6DCw9ToG8FvrwL7BXMKeWN54n', '2016-11-23 23:58:27', null);
INSERT INTO `users` VALUES ('14', 'ddd', '$2y$10$A4Ng7g2p1JmPGshvYz89zOw4rMH4cyWkUSa5w4lzeQVGoyLsmUKH6', '13111111115', 'ddd@qq.com', '1', '40', '0', null, null, null, '2', '1', null, null, null, '0', '41', 'ddd', '0', null, '0', '2016-11-23 23:13:22', 'ddd', null, null, null, 'The girls snuggling with us after a long weekend being boarded at the vet.', 'RaF65kfmkmNoOMdfJxnVBhgPFCVkO7zVooXLC5flQjCF78uhc6', '5DiuqlFQffq537La09V51OujOu5NgPNxE0sDEXw189cXhnQQhvuwpze9P2qm', '2016-11-24 00:01:17', null);
INSERT INTO `users` VALUES ('15', 'eee', '$2y$10$ExK4poB3EgZVphUdc/NRgekwMRXXb2/2MymDkHJtzqbTF8FLfMYQK', '13111111116', 'eee@qq.com', '1', '42', '0', null, null, null, '2', '1', null, null, null, '0', '43', 'eee', '0', null, '0', '2016-11-23 23:14:13', 'eee', null, null, null, 'The girls snuggling with us after a long weekend being boarded at the vet.', 'LrRMgwyxzV3RJxJTUMFgqzzPkiKWXhZr7lqHmFGnJnZR4h2Xr0', 'evQ05Uk27LhLSc5rQD10OZWkWeDJGezRwKa2ng1bpLbEXfToo8AsX63vmlCn', '2016-11-24 00:06:13', null);
INSERT INTO `users` VALUES ('16', 'fff', '$2y$10$pwbbgQ1Nkea618w/48z22OLq/qnrqFjas0McXHfvAXIo.BA0/ZEQK', '13111111117', 'fff@qq.com', '1', '46', '0', null, null, null, '2', '1', null, null, null, '0', '47', 'fff', '0', null, '0', '2016-11-23 23:14:35', 'fff', null, null, null, '这不是一个笑话，而是一个严肃的话题', 'P6bJns2O3b5sMuP9BEpgg7jVUg2hhPA6mYcE5rRE74uqtMtAja', 'LeUd2cssSpeZjG25pgRoZF600xys0ImFyebO3J8TmdEEoYSEd00FbxU20I24', '2016-11-24 00:10:08', null);
INSERT INTO `users` VALUES ('17', 'ggg', '$2y$10$DG3FLC9LbHXbfyDO2/Ctd.eD2tw6D.yKsN5cu9xnfJQr3n3VStEDW', '13111111118', 'ggg@qq.com', '1', '48', '0', null, null, null, '2', '1', null, null, null, '0', '49', 'ggg', '0', null, '0', '2016-11-23 23:14:47', 'ggg', null, null, null, '这不是一个笑话，而是一个严肃的话题', 'N0Yk06zFHADqSlJdGcQzvqGJnOxDccCBV4J1eJYV6PojR4hyxI', 'vclQVRBFIzR4YdxPUMzPywmlpaEVyAv7QuDc8IhpBIL0yCtVwlS0kbDp5NZw', '2016-11-24 00:12:38', null);
INSERT INTO `users` VALUES ('18', 'hhh', '$2y$10$E0JHaFrL/qXoV/wv32U35OPQQ.pSidJSfAsOJzUZkUx4wKtb4Zrqy', '13111111119', 'hhh@qq.com', '1', '50', '0', null, null, null, '2', '1', null, null, null, '0', '51', 'hhh', '0', null, '0', '2016-11-23 23:14:56', 'hhh', null, null, null, '这不是一个笑话，而是一个严肃的话题', 'fCX671GJAZlOmckrTWJdUVOgHZJYYMnTBvlRMUOiBe0pdWQS1d', 'x5qqi8NPfgo2K9mfhkRUs3TWxaEPeylZkje9hf4vJoZ1NykN9YI3cPSgkqfl', '2016-11-24 00:17:13', null);
INSERT INTO `users` VALUES ('19', 'iii', '$2y$10$7c/8jJm7H6ySOWFdqYaHWe.byHDaeNtQYLlr.usMkXBjjw2.TigsO', '13133333331', 'iii@qq.com', '1', '53', '0', null, null, null, '2', '1', null, null, null, '0', '54', 'iii', '0', null, '0', '2016-11-23 23:15:10', 'iii', null, null, null, '近日一名教授在微博上发表题为“中国的防火墙是不是弄反了？', 'Q6dZkPNhFmxtSB1YXGRTKtzp4Zxq6Zf40PDiZYAoGczfiXrTHo', 'PA3hSno7l6m6NqeCKJLdQiuYEEAId8tv7gCdb4lk4EFQHkK9Qj7sSCHDQfyb', '2016-11-24 00:37:23', null);
INSERT INTO `users` VALUES ('20', 'jjj', '$2y$10$9ALu5VAQWizZB0oCNGNjIOHJ/JvkbFt4Td0gAXBToHZz.06Ny2n9i', '15111111111', 'jjj@qq.com', '1', '56', '0', null, null, null, '2', '1', null, null, null, '0', '57', 'jjj', '0', null, '0', '2016-11-23 23:15:34', 'jjj', null, null, null, '话说二郎神与众仙斗法，将哮天犬变成玉皇大帝，就连王母也分辨不出。王母唯恐闹出事端，只好向佛祖求教该如何辨认？\n佛祖说：江山易改本性难移，样貌可以幻化，本性不会改变。\n', 'QBuaFfTSR6KvZxFF8pvZ94S0djlksJrzdyJ5LYORdpa2LK5Ncr', 'ILl02CBFymGBSOHBCmAmoMjDC26Mzz3gs3FRQYotZEQyzZm5ToNchYqugs3N', '2016-11-24 00:40:49', null);
INSERT INTO `users` VALUES ('21', 'kkk', '$2y$10$j8yis8Oi0vfh5f9P3B4Bseg8OTUKPXxNnsgO/rTJ4RuDMuv0ZhOEe', null, 'kkk@qq.com', '1', '59', '0', null, null, null, '2', '1', null, null, null, '0', '60', null, '0', null, '0', '2016-11-23 23:15:43', null, null, null, null, null, 'SaSldkCcIBepN0Cth1FpbrfovCCePhMUQ0anX7fC55N2NkyZWl', 'jO3g5F8wb9MV9UKMyJV4MatTPnjIFvWaAlxeA2IZweJckNFRobZI4Iux2UIP', '2016-11-24 00:42:35', null);
INSERT INTO `users` VALUES ('22', 'lll', '$2y$10$L7dObHGqK56zMRfQlir6.Ol/zzP1ueQuWwt0NMvX4pYKkpvx.XIlC', null, 'lll@qq.com', '1', null, '0', null, null, null, '2', '1', null, null, null, '0', null, null, '0', null, '0', '2016-11-23 23:15:53', null, null, null, null, null, 'JEFEuOYtdAZhtCUvCZZ5hb4N7i9WATcypQvI6bCC0AgnSb0ARZ', null, '2016-11-23 23:15:53', null);
INSERT INTO `users` VALUES ('23', 'mmm', '$2y$10$bGnkSy3T85S4Pn1LPIDjsuShD.ggNbdNSxECgvnfaW6iHQrhf.aQa', '15111111121', 'mmm@qq.com', '1', '61', '0', null, null, null, '2', '1', null, null, null, '0', '62', 'mmm', '0', null, '0', '2016-11-23 23:16:05', 'mmm', null, null, null, '邮箱里收', 'fkhGdWEh9fbKy212QDpHMgHE1GvSYtoXKEy1ywLUu5IxQ76nq7', '5RCyS6iElFyg4A9x5Q8xSib3Eu2K8iuUZrKIHTpwn4t85LboLKRPyAB2MLPe', '2016-11-24 00:55:18', null);
INSERT INTO `users` VALUES ('24', 'nnn', '$2y$10$eZ6biv3zxPfeQeLNFq0gJueL5PemMC.NQrdqexhuG/Q2uVTs2kQCa', null, 'nnn@qq.com', '1', null, '0', null, null, null, '2', '1', null, null, null, '0', null, null, '0', null, '0', '2016-11-23 23:16:14', null, null, null, null, null, 'f73lIu0dppJjMBqJb0KHMidHKS828xiLJlfrx7qdNuPwjuaZhN', null, '2016-11-23 23:16:14', null);
INSERT INTO `users` VALUES ('25', 'wangruhe', '$2y$10$p1YhhXKe//CasDqjAQ/ISuBe1bP7AjGjFJ6xtTi.7ksmUpQf2tbx2', '15122222222', '12345678@qq.com', '3', '70', '0', null, null, null, '2', '1', '36,41,', null, null, '0', '71', 'wangruhe', '0', null, '0', '2016-11-24 01:43:18', 'wangruhe', null, null, null, '新盈利模式，汩汩而出。', '7ATNNTz8FdRLXU8F6tD9ejTBH5SNckFCpb912yJpPeHlK0DgIh', 'bNvWUP8MY8Irq2z2fztEPBU2SCt3ZiFDYFZAlOuMrBRHFyK0U4swTkS9CFUh', '2016-11-24 08:20:31', null);

-- ----------------------------
-- Table structure for votes
-- ----------------------------
DROP TABLE IF EXISTS `votes`;
CREATE TABLE `votes` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '投票编号',
  `postid` int(11) NOT NULL COMMENT '所属帖子编号',
  `choice` varchar(100) NOT NULL COMMENT '一个投票选项',
  `picid` int(11) DEFAULT NULL COMMENT '选项图片编',
  `num` int(11) NOT NULL DEFAULT '0' COMMENT '票数',
  `userid` text COMMENT '投过该项的用户编号列表，逗号分隔',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of votes
-- ----------------------------
