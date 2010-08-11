$out="";
while(<>) {
	chomp;
	s/\/\/.*$//;
	s/^ *//g;
	s/ *$//g;
	#print $_,$/;
	#s/\Q)','rgb(\E/X/g;
	#s/return /Z/g;
	#s/function /\@/g;
	my $k = $_;
	$out.=$k;
}
print $out;
#print "var Q=\"$out\";\neval(Q.replace(/@/g,'function ').replace(/Z/g,'return ').replace(/X/g,\")','rgb(\"))";
