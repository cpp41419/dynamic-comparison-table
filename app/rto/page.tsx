import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Award, Users, Calendar } from "lucide-react"

export default function RTOPage() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <GraduationCap className="h-16 w-16 text-primary" />
            </div>
            <CardTitle className="text-3xl font-bold">Registered Training Organisation</CardTitle>
            <p className="text-muted-foreground text-lg">Information about our accredited training providers</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Accreditation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    All our training providers are fully accredited RTOs under the Australian Skills Quality Authority
                    (ASQA).
                  </p>
                  <div className="mt-4 space-y-2">
                    <Badge variant="secondary">ASQA Registered</Badge>
                    <Badge variant="secondary">Nationally Recognised</Badge>
                    <Badge variant="secondary">Industry Approved</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Student Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Comprehensive student support services including career guidance, learning resources, and ongoing
                    mentorship.
                  </p>
                  <div className="mt-4 space-y-2">
                    <Badge variant="outline">24/7 Support</Badge>
                    <Badge variant="outline">Career Guidance</Badge>
                    <Badge variant="outline">Learning Resources</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Course Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-semibold">Duration</h4>
                    <p className="text-muted-foreground">6-12 months</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Study Mode</h4>
                    <p className="text-muted-foreground">Online & Face-to-face</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Assessment</h4>
                    <p className="text-muted-foreground">Competency-based</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="text-center">
              <p className="text-muted-foreground">
                For more information about specific RTO requirements and course details, please submit an enquiry
                through our comparison tool.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
