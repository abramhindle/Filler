my $o = "";
while(<>) {
	$o.=$_;
}
my @o = split(//,$o);
my $l0 = shift @o;
my $l1 = shift @o;
$h{"$l0$l1"}++;
my %h;
while(@o) {
	my $n = shift @o;
	$h{"$l0$l1$n"}++;
	$h{"$l1$n"}++;
	$l0 = $l1;
	$l1 = $n;
}
my @k = sort {$h{$a}*length($a) <=> $h{$b}*length($b)} keys %h;
foreach my $k (@k) {
	print "$k - $h{$k}$/";
}
