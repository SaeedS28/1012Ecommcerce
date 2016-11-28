create table collection (
  id int primary key not null,
  album text not null,
  artist text not null,
  year int not null,
  cover text,
  number int,
  price real 
);
insert into collection values (101, 'Led Zeppelin IV', 'Led Zeppelin', 1971, 
'http://ecx.images-amazon.com/images/I/61qTE9kINgL.jpg', 3, 19.99);
insert into collection values (102, 'Kind of Blue', 'Davis, Miles', 1959, 
'http://ecx.images-amazon.com/images/I/51UVX5HKIiL._AA160_.jpg', 3, 19.99);
insert into collection values (103, 'Exile on Main Street', 'Rolling Stones', 1971, 
'http://ecx.images-amazon.com/images/I/61XXWX6tmCL._AA160_.jpg', 3, 19.99);
insert into collection values (104, 'Modern Sounds in Country and Western Music', 'Charles, 
Ray', 1962, 'http://ecx.images-amazon.com/images/I/414HN7PMHKL._AA160_.jpg', 3, 19.99);
insert into collection values (105, 'Dark Side of the Moon', 'Pink Floyd', 1973, 
'http://ecx.images-amazon.com/images/I/31gnOm4OFlL._AA160_.jpg', 3, 19.99);
insert into collection values (106, 'Abbey Road', 'Beatles, The', 1969, 
'http://ecx.images-amazon.com/images/I/615C7P4pmdL._AA160_.jpg', 3, 19.99);
insert into collection values (107, 'Sgt. Peppers Lonely Hearts Club Band', 'Beatles, The', 
1967, 'http://ecx.images-amazon.com/images/I/61nwtHCYOqL._AA160_.jpg', 3, 19.99);
insert into collection values (108, 'Back in Black', 'AC/DC', 1980, 
'http://ecx.images-amazon.com/images/I/31NpVIEtPGL._AA160_.jpg', 3, 19.99);
insert into collection values (109, 'The Kids are Alright', 'Who, The', 1979, 
'http://ecx.images-amazon.com/images/I/617RAk0AakL._AA160_.jpg', 3, 19.99);
insert into collection values (110, "Who's Next", 'Who, The', 1971, 
'http://ecx.images-amazon.com/images/I/61Ab-td5fbL._AA160_.jpg, 3, 19.99);

