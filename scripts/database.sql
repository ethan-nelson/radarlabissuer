CREATE TABLE `warnings` (
	`forecaster` int,
	`warningtype` text,
	`threat` text,
	`magnitude` text,
	`source` text,
	`radartime` time,
	`expirationtime` time,
	`direction` text,
	`speed` text,
	`details` text,
	`polygon` text,
	`timestamp` timestamp default current_timestamp
);
